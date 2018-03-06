package org.optaplanner.webexamples.web.rest;

import org.optaplanner.webexamples.VehicleroutingApp;

import org.optaplanner.webexamples.domain.JsonMessage;
import org.optaplanner.webexamples.repository.JsonMessageRepository;
import org.optaplanner.webexamples.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.optaplanner.webexamples.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the JsonMessageResource REST controller.
 *
 * @see JsonMessageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VehicleroutingApp.class)
public class JsonMessageResourceIntTest {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    @Autowired
    private JsonMessageRepository jsonMessageRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJsonMessageMockMvc;

    private JsonMessage jsonMessage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JsonMessageResource jsonMessageResource = new JsonMessageResource(jsonMessageRepository);
        this.restJsonMessageMockMvc = MockMvcBuilders.standaloneSetup(jsonMessageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JsonMessage createEntity(EntityManager em) {
        JsonMessage jsonMessage = new JsonMessage()
            .text(DEFAULT_TEXT);
        return jsonMessage;
    }

    @Before
    public void initTest() {
        jsonMessage = createEntity(em);
    }

    @Test
    @Transactional
    public void createJsonMessage() throws Exception {
        int databaseSizeBeforeCreate = jsonMessageRepository.findAll().size();

        // Create the JsonMessage
        restJsonMessageMockMvc.perform(post("/api/json-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonMessage)))
            .andExpect(status().isCreated());

        // Validate the JsonMessage in the database
        List<JsonMessage> jsonMessageList = jsonMessageRepository.findAll();
        assertThat(jsonMessageList).hasSize(databaseSizeBeforeCreate + 1);
        JsonMessage testJsonMessage = jsonMessageList.get(jsonMessageList.size() - 1);
        assertThat(testJsonMessage.getText()).isEqualTo(DEFAULT_TEXT);
    }

    @Test
    @Transactional
    public void createJsonMessageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jsonMessageRepository.findAll().size();

        // Create the JsonMessage with an existing ID
        jsonMessage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJsonMessageMockMvc.perform(post("/api/json-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonMessage)))
            .andExpect(status().isBadRequest());

        // Validate the JsonMessage in the database
        List<JsonMessage> jsonMessageList = jsonMessageRepository.findAll();
        assertThat(jsonMessageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJsonMessages() throws Exception {
        // Initialize the database
        jsonMessageRepository.saveAndFlush(jsonMessage);

        // Get all the jsonMessageList
        restJsonMessageMockMvc.perform(get("/api/json-messages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jsonMessage.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())));
    }

    @Test
    @Transactional
    public void getJsonMessage() throws Exception {
        // Initialize the database
        jsonMessageRepository.saveAndFlush(jsonMessage);

        // Get the jsonMessage
        restJsonMessageMockMvc.perform(get("/api/json-messages/{id}", jsonMessage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jsonMessage.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJsonMessage() throws Exception {
        // Get the jsonMessage
        restJsonMessageMockMvc.perform(get("/api/json-messages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJsonMessage() throws Exception {
        // Initialize the database
        jsonMessageRepository.saveAndFlush(jsonMessage);
        int databaseSizeBeforeUpdate = jsonMessageRepository.findAll().size();

        // Update the jsonMessage
        JsonMessage updatedJsonMessage = jsonMessageRepository.findOne(jsonMessage.getId());
        // Disconnect from session so that the updates on updatedJsonMessage are not directly saved in db
        em.detach(updatedJsonMessage);
        updatedJsonMessage
            .text(UPDATED_TEXT);

        restJsonMessageMockMvc.perform(put("/api/json-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJsonMessage)))
            .andExpect(status().isOk());

        // Validate the JsonMessage in the database
        List<JsonMessage> jsonMessageList = jsonMessageRepository.findAll();
        assertThat(jsonMessageList).hasSize(databaseSizeBeforeUpdate);
        JsonMessage testJsonMessage = jsonMessageList.get(jsonMessageList.size() - 1);
        assertThat(testJsonMessage.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingJsonMessage() throws Exception {
        int databaseSizeBeforeUpdate = jsonMessageRepository.findAll().size();

        // Create the JsonMessage

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJsonMessageMockMvc.perform(put("/api/json-messages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonMessage)))
            .andExpect(status().isCreated());

        // Validate the JsonMessage in the database
        List<JsonMessage> jsonMessageList = jsonMessageRepository.findAll();
        assertThat(jsonMessageList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJsonMessage() throws Exception {
        // Initialize the database
        jsonMessageRepository.saveAndFlush(jsonMessage);
        int databaseSizeBeforeDelete = jsonMessageRepository.findAll().size();

        // Get the jsonMessage
        restJsonMessageMockMvc.perform(delete("/api/json-messages/{id}", jsonMessage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JsonMessage> jsonMessageList = jsonMessageRepository.findAll();
        assertThat(jsonMessageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JsonMessage.class);
        JsonMessage jsonMessage1 = new JsonMessage();
        jsonMessage1.setId(1L);
        JsonMessage jsonMessage2 = new JsonMessage();
        jsonMessage2.setId(jsonMessage1.getId());
        assertThat(jsonMessage1).isEqualTo(jsonMessage2);
        jsonMessage2.setId(2L);
        assertThat(jsonMessage1).isNotEqualTo(jsonMessage2);
        jsonMessage1.setId(null);
        assertThat(jsonMessage1).isNotEqualTo(jsonMessage2);
    }
}
