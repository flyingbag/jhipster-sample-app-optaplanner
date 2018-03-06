package org.optaplanner.webexamples.web.rest;

import org.optaplanner.webexamples.VehicleroutingApp;

import org.optaplanner.webexamples.domain.JsonCustomer;
import org.optaplanner.webexamples.repository.JsonCustomerRepository;
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
 * Test class for the JsonCustomerResource REST controller.
 *
 * @see JsonCustomerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VehicleroutingApp.class)
public class JsonCustomerResourceIntTest {

    private static final String DEFAULT_LOCATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_LATITUDE = 1D;
    private static final Double UPDATED_LATITUDE = 2D;

    private static final Double DEFAULT_LONGITUDE = 1D;
    private static final Double UPDATED_LONGITUDE = 2D;

    private static final Integer DEFAULT_DEMAND = 1;
    private static final Integer UPDATED_DEMAND = 2;

    @Autowired
    private JsonCustomerRepository jsonCustomerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJsonCustomerMockMvc;

    private JsonCustomer jsonCustomer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JsonCustomerResource jsonCustomerResource = new JsonCustomerResource(jsonCustomerRepository);
        this.restJsonCustomerMockMvc = MockMvcBuilders.standaloneSetup(jsonCustomerResource)
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
    public static JsonCustomer createEntity(EntityManager em) {
        JsonCustomer jsonCustomer = new JsonCustomer()
            .locationName(DEFAULT_LOCATION_NAME)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE)
            .demand(DEFAULT_DEMAND);
        return jsonCustomer;
    }

    @Before
    public void initTest() {
        jsonCustomer = createEntity(em);
    }

    @Test
    @Transactional
    public void createJsonCustomer() throws Exception {
        int databaseSizeBeforeCreate = jsonCustomerRepository.findAll().size();

        // Create the JsonCustomer
        restJsonCustomerMockMvc.perform(post("/api/json-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonCustomer)))
            .andExpect(status().isCreated());

        // Validate the JsonCustomer in the database
        List<JsonCustomer> jsonCustomerList = jsonCustomerRepository.findAll();
        assertThat(jsonCustomerList).hasSize(databaseSizeBeforeCreate + 1);
        JsonCustomer testJsonCustomer = jsonCustomerList.get(jsonCustomerList.size() - 1);
        assertThat(testJsonCustomer.getLocationName()).isEqualTo(DEFAULT_LOCATION_NAME);
        assertThat(testJsonCustomer.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testJsonCustomer.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testJsonCustomer.getDemand()).isEqualTo(DEFAULT_DEMAND);
    }

    @Test
    @Transactional
    public void createJsonCustomerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jsonCustomerRepository.findAll().size();

        // Create the JsonCustomer with an existing ID
        jsonCustomer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJsonCustomerMockMvc.perform(post("/api/json-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonCustomer)))
            .andExpect(status().isBadRequest());

        // Validate the JsonCustomer in the database
        List<JsonCustomer> jsonCustomerList = jsonCustomerRepository.findAll();
        assertThat(jsonCustomerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJsonCustomers() throws Exception {
        // Initialize the database
        jsonCustomerRepository.saveAndFlush(jsonCustomer);

        // Get all the jsonCustomerList
        restJsonCustomerMockMvc.perform(get("/api/json-customers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jsonCustomer.getId().intValue())))
            .andExpect(jsonPath("$.[*].locationName").value(hasItem(DEFAULT_LOCATION_NAME.toString())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].demand").value(hasItem(DEFAULT_DEMAND)));
    }

    @Test
    @Transactional
    public void getJsonCustomer() throws Exception {
        // Initialize the database
        jsonCustomerRepository.saveAndFlush(jsonCustomer);

        // Get the jsonCustomer
        restJsonCustomerMockMvc.perform(get("/api/json-customers/{id}", jsonCustomer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jsonCustomer.getId().intValue()))
            .andExpect(jsonPath("$.locationName").value(DEFAULT_LOCATION_NAME.toString()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.demand").value(DEFAULT_DEMAND));
    }

    @Test
    @Transactional
    public void getNonExistingJsonCustomer() throws Exception {
        // Get the jsonCustomer
        restJsonCustomerMockMvc.perform(get("/api/json-customers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJsonCustomer() throws Exception {
        // Initialize the database
        jsonCustomerRepository.saveAndFlush(jsonCustomer);
        int databaseSizeBeforeUpdate = jsonCustomerRepository.findAll().size();

        // Update the jsonCustomer
        JsonCustomer updatedJsonCustomer = jsonCustomerRepository.findOne(jsonCustomer.getId());
        // Disconnect from session so that the updates on updatedJsonCustomer are not directly saved in db
        em.detach(updatedJsonCustomer);
        updatedJsonCustomer
            .locationName(UPDATED_LOCATION_NAME)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .demand(UPDATED_DEMAND);

        restJsonCustomerMockMvc.perform(put("/api/json-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJsonCustomer)))
            .andExpect(status().isOk());

        // Validate the JsonCustomer in the database
        List<JsonCustomer> jsonCustomerList = jsonCustomerRepository.findAll();
        assertThat(jsonCustomerList).hasSize(databaseSizeBeforeUpdate);
        JsonCustomer testJsonCustomer = jsonCustomerList.get(jsonCustomerList.size() - 1);
        assertThat(testJsonCustomer.getLocationName()).isEqualTo(UPDATED_LOCATION_NAME);
        assertThat(testJsonCustomer.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testJsonCustomer.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testJsonCustomer.getDemand()).isEqualTo(UPDATED_DEMAND);
    }

    @Test
    @Transactional
    public void updateNonExistingJsonCustomer() throws Exception {
        int databaseSizeBeforeUpdate = jsonCustomerRepository.findAll().size();

        // Create the JsonCustomer

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJsonCustomerMockMvc.perform(put("/api/json-customers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonCustomer)))
            .andExpect(status().isCreated());

        // Validate the JsonCustomer in the database
        List<JsonCustomer> jsonCustomerList = jsonCustomerRepository.findAll();
        assertThat(jsonCustomerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJsonCustomer() throws Exception {
        // Initialize the database
        jsonCustomerRepository.saveAndFlush(jsonCustomer);
        int databaseSizeBeforeDelete = jsonCustomerRepository.findAll().size();

        // Get the jsonCustomer
        restJsonCustomerMockMvc.perform(delete("/api/json-customers/{id}", jsonCustomer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JsonCustomer> jsonCustomerList = jsonCustomerRepository.findAll();
        assertThat(jsonCustomerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JsonCustomer.class);
        JsonCustomer jsonCustomer1 = new JsonCustomer();
        jsonCustomer1.setId(1L);
        JsonCustomer jsonCustomer2 = new JsonCustomer();
        jsonCustomer2.setId(jsonCustomer1.getId());
        assertThat(jsonCustomer1).isEqualTo(jsonCustomer2);
        jsonCustomer2.setId(2L);
        assertThat(jsonCustomer1).isNotEqualTo(jsonCustomer2);
        jsonCustomer1.setId(null);
        assertThat(jsonCustomer1).isNotEqualTo(jsonCustomer2);
    }
}
