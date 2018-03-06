package org.optaplanner.webexamples.web.rest;

import org.optaplanner.webexamples.VehicleroutingApp;

import org.optaplanner.webexamples.domain.JsonVehicleRoutingSolution;
import org.optaplanner.webexamples.repository.JsonVehicleRoutingSolutionRepository;
import org.optaplanner.webexamples.service.JsonVehicleRoutingSolutionService;
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
 * Test class for the JsonVehicleRoutingSolutionResource REST controller.
 *
 * @see JsonVehicleRoutingSolutionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VehicleroutingApp.class)
public class JsonVehicleRoutingSolutionResourceIntTest {
    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_FEASIBLE = false;
    private static final Boolean UPDATED_FEASIBLE = true;

    private static final String DEFAULT_DISTANCE = "AAAAAAAAAA";
    private static final String UPDATED_DISTANCE = "BBBBBBBBBB";

    @Autowired
    private JsonVehicleRoutingSolutionRepository jsonVehicleRoutingSolutionRepository;

    @Autowired
    private JsonVehicleRoutingSolutionService jsonVehicleRoutingSolutionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJsonVehicleRoutingSolutionMockMvc;

    private JsonVehicleRoutingSolution jsonVehicleRoutingSolution;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JsonVehicleRoutingSolutionResource jsonVehicleRoutingSolutionResource = new JsonVehicleRoutingSolutionResource(jsonVehicleRoutingSolutionService);
        this.restJsonVehicleRoutingSolutionMockMvc = MockMvcBuilders.standaloneSetup(jsonVehicleRoutingSolutionResource)
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
    public static JsonVehicleRoutingSolution createEntity(EntityManager em) {
        JsonVehicleRoutingSolution jsonVehicleRoutingSolution = new JsonVehicleRoutingSolution()
            .name(DEFAULT_NAME)
            .feasible(DEFAULT_FEASIBLE)
            .distance(DEFAULT_DISTANCE);
        return jsonVehicleRoutingSolution;
    }

    @Before
    public void initTest() {
        jsonVehicleRoutingSolution = createEntity(em);
    }

    @Test
    @Transactional
    public void createJsonVehicleRoutingSolution() throws Exception {
        int databaseSizeBeforeCreate = jsonVehicleRoutingSolutionRepository.findAll().size();

        // Create the JsonVehicleRoutingSolution
        restJsonVehicleRoutingSolutionMockMvc.perform(post("/api/json-vehicle-routing-solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonVehicleRoutingSolution)))
            .andExpect(status().isCreated());

        // Validate the JsonVehicleRoutingSolution in the database
        List<JsonVehicleRoutingSolution> jsonVehicleRoutingSolutionList = jsonVehicleRoutingSolutionRepository.findAll();
        assertThat(jsonVehicleRoutingSolutionList).hasSize(databaseSizeBeforeCreate + 1);
        JsonVehicleRoutingSolution testJsonVehicleRoutingSolution = jsonVehicleRoutingSolutionList.get(jsonVehicleRoutingSolutionList.size() - 1);
        assertThat(testJsonVehicleRoutingSolution.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testJsonVehicleRoutingSolution.isFeasible()).isEqualTo(DEFAULT_FEASIBLE);
        assertThat(testJsonVehicleRoutingSolution.getDistance()).isEqualTo(DEFAULT_DISTANCE);
    }

    @Test
    @Transactional
    public void createJsonVehicleRoutingSolutionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jsonVehicleRoutingSolutionRepository.findAll().size();

        // Create the JsonVehicleRoutingSolution with an existing ID
        jsonVehicleRoutingSolution.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJsonVehicleRoutingSolutionMockMvc.perform(post("/api/json-vehicle-routing-solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonVehicleRoutingSolution)))
            .andExpect(status().isBadRequest());

        // Validate the JsonVehicleRoutingSolution in the database
        List<JsonVehicleRoutingSolution> jsonVehicleRoutingSolutionList = jsonVehicleRoutingSolutionRepository.findAll();
        assertThat(jsonVehicleRoutingSolutionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJsonVehicleRoutingSolutions() throws Exception {
        // Initialize the database
        jsonVehicleRoutingSolutionRepository.saveAndFlush(jsonVehicleRoutingSolution);

        // Get all the jsonVehicleRoutingSolutionList
        restJsonVehicleRoutingSolutionMockMvc.perform(get("/api/json-vehicle-routing-solutions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jsonVehicleRoutingSolution.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].feasible").value(hasItem(DEFAULT_FEASIBLE.booleanValue())))
            .andExpect(jsonPath("$.[*].distance").value(hasItem(DEFAULT_DISTANCE.toString())));
    }

    @Test
    @Transactional
    public void getJsonVehicleRoutingSolution() throws Exception {
        // Initialize the database
        jsonVehicleRoutingSolutionRepository.saveAndFlush(jsonVehicleRoutingSolution);

        // Get the jsonVehicleRoutingSolution
        restJsonVehicleRoutingSolutionMockMvc.perform(get("/api/json-vehicle-routing-solutions/{id}", jsonVehicleRoutingSolution.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jsonVehicleRoutingSolution.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.feasible").value(DEFAULT_FEASIBLE.booleanValue()))
            .andExpect(jsonPath("$.distance").value(DEFAULT_DISTANCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJsonVehicleRoutingSolution() throws Exception {
        // Get the jsonVehicleRoutingSolution
        restJsonVehicleRoutingSolutionMockMvc.perform(get("/api/json-vehicle-routing-solutions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJsonVehicleRoutingSolution() throws Exception {
        // Initialize the database
        jsonVehicleRoutingSolutionService.save(jsonVehicleRoutingSolution);

        int databaseSizeBeforeUpdate = jsonVehicleRoutingSolutionRepository.findAll().size();

        // Update the jsonVehicleRoutingSolution
        JsonVehicleRoutingSolution updatedJsonVehicleRoutingSolution = jsonVehicleRoutingSolutionRepository.findOne(jsonVehicleRoutingSolution.getId());
        // Disconnect from session so that the updates on updatedJsonVehicleRoutingSolution are not directly saved in db
        em.detach(updatedJsonVehicleRoutingSolution);
        updatedJsonVehicleRoutingSolution
            .name(UPDATED_NAME)
            .feasible(UPDATED_FEASIBLE)
            .distance(UPDATED_DISTANCE);

        restJsonVehicleRoutingSolutionMockMvc.perform(put("/api/json-vehicle-routing-solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJsonVehicleRoutingSolution)))
            .andExpect(status().isOk());

        // Validate the JsonVehicleRoutingSolution in the database
        List<JsonVehicleRoutingSolution> jsonVehicleRoutingSolutionList = jsonVehicleRoutingSolutionRepository.findAll();
        assertThat(jsonVehicleRoutingSolutionList).hasSize(databaseSizeBeforeUpdate);
        JsonVehicleRoutingSolution testJsonVehicleRoutingSolution = jsonVehicleRoutingSolutionList.get(jsonVehicleRoutingSolutionList.size() - 1);
        assertThat(testJsonVehicleRoutingSolution.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testJsonVehicleRoutingSolution.isFeasible()).isEqualTo(UPDATED_FEASIBLE);
        assertThat(testJsonVehicleRoutingSolution.getDistance()).isEqualTo(UPDATED_DISTANCE);
    }

    @Test
    @Transactional
    public void updateNonExistingJsonVehicleRoutingSolution() throws Exception {
        int databaseSizeBeforeUpdate = jsonVehicleRoutingSolutionRepository.findAll().size();

        // Create the JsonVehicleRoutingSolution

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJsonVehicleRoutingSolutionMockMvc.perform(put("/api/json-vehicle-routing-solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonVehicleRoutingSolution)))
            .andExpect(status().isCreated());

        // Validate the JsonVehicleRoutingSolution in the database
        List<JsonVehicleRoutingSolution> jsonVehicleRoutingSolutionList = jsonVehicleRoutingSolutionRepository.findAll();
        assertThat(jsonVehicleRoutingSolutionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJsonVehicleRoutingSolution() throws Exception {
        // Initialize the database
        jsonVehicleRoutingSolutionService.save(jsonVehicleRoutingSolution);

        int databaseSizeBeforeDelete = jsonVehicleRoutingSolutionRepository.findAll().size();

        // Get the jsonVehicleRoutingSolution
        restJsonVehicleRoutingSolutionMockMvc.perform(delete("/api/json-vehicle-routing-solutions/{id}", jsonVehicleRoutingSolution.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JsonVehicleRoutingSolution> jsonVehicleRoutingSolutionList = jsonVehicleRoutingSolutionRepository.findAll();
        assertThat(jsonVehicleRoutingSolutionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void getSolution() throws Exception {
        restJsonVehicleRoutingSolutionMockMvc.perform(get("/api/solution"))
            .andExpect(status().isOk());
    }

    @Test
    public void solve() throws Exception {
        restJsonVehicleRoutingSolutionMockMvc.perform(post("/api/solution/solve"))
            .andExpect(status().isOk());
    }

    @Test
    public void terminateEarly() throws Exception {
        restJsonVehicleRoutingSolutionMockMvc.perform(post("/api/solution/terminateEarly"))
            .andExpect(status().isOk());
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JsonVehicleRoutingSolution.class);
        JsonVehicleRoutingSolution jsonVehicleRoutingSolution1 = new JsonVehicleRoutingSolution();
        jsonVehicleRoutingSolution1.setId(1L);
        JsonVehicleRoutingSolution jsonVehicleRoutingSolution2 = new JsonVehicleRoutingSolution();
        jsonVehicleRoutingSolution2.setId(jsonVehicleRoutingSolution1.getId());
        assertThat(jsonVehicleRoutingSolution1).isEqualTo(jsonVehicleRoutingSolution2);
        jsonVehicleRoutingSolution2.setId(2L);
        assertThat(jsonVehicleRoutingSolution1).isNotEqualTo(jsonVehicleRoutingSolution2);
        jsonVehicleRoutingSolution1.setId(null);
        assertThat(jsonVehicleRoutingSolution1).isNotEqualTo(jsonVehicleRoutingSolution2);
    }
}
