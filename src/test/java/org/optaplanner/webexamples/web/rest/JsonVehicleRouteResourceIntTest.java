package org.optaplanner.webexamples.web.rest;

import org.optaplanner.webexamples.VehicleroutingApp;

import org.optaplanner.webexamples.domain.JsonVehicleRoute;
import org.optaplanner.webexamples.repository.JsonVehicleRouteRepository;
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
 * Test class for the JsonVehicleRouteResource REST controller.
 *
 * @see JsonVehicleRouteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VehicleroutingApp.class)
public class JsonVehicleRouteResourceIntTest {

    private static final String DEFAULT_DEPOT_LOCATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DEPOT_LOCATION_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_DEPOT_LATITUDE = 1D;
    private static final Double UPDATED_DEPOT_LATITUDE = 2D;

    private static final Double DEFAULT_DEPOT_LONGITUDE = 1D;
    private static final Double UPDATED_DEPOT_LONGITUDE = 2D;

    private static final String DEFAULT_HEX_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_HEX_COLOR = "BBBBBBBBBB";

    private static final Integer DEFAULT_CAPACITY = 1;
    private static final Integer UPDATED_CAPACITY = 2;

    private static final Integer DEFAULT_DEMAND_TOTAL = 1;
    private static final Integer UPDATED_DEMAND_TOTAL = 2;

    @Autowired
    private JsonVehicleRouteRepository jsonVehicleRouteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJsonVehicleRouteMockMvc;

    private JsonVehicleRoute jsonVehicleRoute;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JsonVehicleRouteResource jsonVehicleRouteResource = new JsonVehicleRouteResource(jsonVehicleRouteRepository);
        this.restJsonVehicleRouteMockMvc = MockMvcBuilders.standaloneSetup(jsonVehicleRouteResource)
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
    public static JsonVehicleRoute createEntity(EntityManager em) {
        JsonVehicleRoute jsonVehicleRoute = new JsonVehicleRoute()
            .depotLocationName(DEFAULT_DEPOT_LOCATION_NAME)
            .depotLatitude(DEFAULT_DEPOT_LATITUDE)
            .depotLongitude(DEFAULT_DEPOT_LONGITUDE)
            .hexColor(DEFAULT_HEX_COLOR)
            .capacity(DEFAULT_CAPACITY)
            .demandTotal(DEFAULT_DEMAND_TOTAL);
        return jsonVehicleRoute;
    }

    @Before
    public void initTest() {
        jsonVehicleRoute = createEntity(em);
    }

    @Test
    @Transactional
    public void createJsonVehicleRoute() throws Exception {
        int databaseSizeBeforeCreate = jsonVehicleRouteRepository.findAll().size();

        // Create the JsonVehicleRoute
        restJsonVehicleRouteMockMvc.perform(post("/api/json-vehicle-routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonVehicleRoute)))
            .andExpect(status().isCreated());

        // Validate the JsonVehicleRoute in the database
        List<JsonVehicleRoute> jsonVehicleRouteList = jsonVehicleRouteRepository.findAll();
        assertThat(jsonVehicleRouteList).hasSize(databaseSizeBeforeCreate + 1);
        JsonVehicleRoute testJsonVehicleRoute = jsonVehicleRouteList.get(jsonVehicleRouteList.size() - 1);
        assertThat(testJsonVehicleRoute.getDepotLocationName()).isEqualTo(DEFAULT_DEPOT_LOCATION_NAME);
        assertThat(testJsonVehicleRoute.getDepotLatitude()).isEqualTo(DEFAULT_DEPOT_LATITUDE);
        assertThat(testJsonVehicleRoute.getDepotLongitude()).isEqualTo(DEFAULT_DEPOT_LONGITUDE);
        assertThat(testJsonVehicleRoute.getHexColor()).isEqualTo(DEFAULT_HEX_COLOR);
        assertThat(testJsonVehicleRoute.getCapacity()).isEqualTo(DEFAULT_CAPACITY);
        assertThat(testJsonVehicleRoute.getDemandTotal()).isEqualTo(DEFAULT_DEMAND_TOTAL);
    }

    @Test
    @Transactional
    public void createJsonVehicleRouteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jsonVehicleRouteRepository.findAll().size();

        // Create the JsonVehicleRoute with an existing ID
        jsonVehicleRoute.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJsonVehicleRouteMockMvc.perform(post("/api/json-vehicle-routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonVehicleRoute)))
            .andExpect(status().isBadRequest());

        // Validate the JsonVehicleRoute in the database
        List<JsonVehicleRoute> jsonVehicleRouteList = jsonVehicleRouteRepository.findAll();
        assertThat(jsonVehicleRouteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJsonVehicleRoutes() throws Exception {
        // Initialize the database
        jsonVehicleRouteRepository.saveAndFlush(jsonVehicleRoute);

        // Get all the jsonVehicleRouteList
        restJsonVehicleRouteMockMvc.perform(get("/api/json-vehicle-routes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jsonVehicleRoute.getId().intValue())))
            .andExpect(jsonPath("$.[*].depotLocationName").value(hasItem(DEFAULT_DEPOT_LOCATION_NAME.toString())))
            .andExpect(jsonPath("$.[*].depotLatitude").value(hasItem(DEFAULT_DEPOT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].depotLongitude").value(hasItem(DEFAULT_DEPOT_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].hexColor").value(hasItem(DEFAULT_HEX_COLOR.toString())))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY)))
            .andExpect(jsonPath("$.[*].demandTotal").value(hasItem(DEFAULT_DEMAND_TOTAL)));
    }

    @Test
    @Transactional
    public void getJsonVehicleRoute() throws Exception {
        // Initialize the database
        jsonVehicleRouteRepository.saveAndFlush(jsonVehicleRoute);

        // Get the jsonVehicleRoute
        restJsonVehicleRouteMockMvc.perform(get("/api/json-vehicle-routes/{id}", jsonVehicleRoute.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jsonVehicleRoute.getId().intValue()))
            .andExpect(jsonPath("$.depotLocationName").value(DEFAULT_DEPOT_LOCATION_NAME.toString()))
            .andExpect(jsonPath("$.depotLatitude").value(DEFAULT_DEPOT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.depotLongitude").value(DEFAULT_DEPOT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.hexColor").value(DEFAULT_HEX_COLOR.toString()))
            .andExpect(jsonPath("$.capacity").value(DEFAULT_CAPACITY))
            .andExpect(jsonPath("$.demandTotal").value(DEFAULT_DEMAND_TOTAL));
    }

    @Test
    @Transactional
    public void getNonExistingJsonVehicleRoute() throws Exception {
        // Get the jsonVehicleRoute
        restJsonVehicleRouteMockMvc.perform(get("/api/json-vehicle-routes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJsonVehicleRoute() throws Exception {
        // Initialize the database
        jsonVehicleRouteRepository.saveAndFlush(jsonVehicleRoute);
        int databaseSizeBeforeUpdate = jsonVehicleRouteRepository.findAll().size();

        // Update the jsonVehicleRoute
        JsonVehicleRoute updatedJsonVehicleRoute = jsonVehicleRouteRepository.findOne(jsonVehicleRoute.getId());
        // Disconnect from session so that the updates on updatedJsonVehicleRoute are not directly saved in db
        em.detach(updatedJsonVehicleRoute);
        updatedJsonVehicleRoute
            .depotLocationName(UPDATED_DEPOT_LOCATION_NAME)
            .depotLatitude(UPDATED_DEPOT_LATITUDE)
            .depotLongitude(UPDATED_DEPOT_LONGITUDE)
            .hexColor(UPDATED_HEX_COLOR)
            .capacity(UPDATED_CAPACITY)
            .demandTotal(UPDATED_DEMAND_TOTAL);

        restJsonVehicleRouteMockMvc.perform(put("/api/json-vehicle-routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedJsonVehicleRoute)))
            .andExpect(status().isOk());

        // Validate the JsonVehicleRoute in the database
        List<JsonVehicleRoute> jsonVehicleRouteList = jsonVehicleRouteRepository.findAll();
        assertThat(jsonVehicleRouteList).hasSize(databaseSizeBeforeUpdate);
        JsonVehicleRoute testJsonVehicleRoute = jsonVehicleRouteList.get(jsonVehicleRouteList.size() - 1);
        assertThat(testJsonVehicleRoute.getDepotLocationName()).isEqualTo(UPDATED_DEPOT_LOCATION_NAME);
        assertThat(testJsonVehicleRoute.getDepotLatitude()).isEqualTo(UPDATED_DEPOT_LATITUDE);
        assertThat(testJsonVehicleRoute.getDepotLongitude()).isEqualTo(UPDATED_DEPOT_LONGITUDE);
        assertThat(testJsonVehicleRoute.getHexColor()).isEqualTo(UPDATED_HEX_COLOR);
        assertThat(testJsonVehicleRoute.getCapacity()).isEqualTo(UPDATED_CAPACITY);
        assertThat(testJsonVehicleRoute.getDemandTotal()).isEqualTo(UPDATED_DEMAND_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingJsonVehicleRoute() throws Exception {
        int databaseSizeBeforeUpdate = jsonVehicleRouteRepository.findAll().size();

        // Create the JsonVehicleRoute

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJsonVehicleRouteMockMvc.perform(put("/api/json-vehicle-routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jsonVehicleRoute)))
            .andExpect(status().isCreated());

        // Validate the JsonVehicleRoute in the database
        List<JsonVehicleRoute> jsonVehicleRouteList = jsonVehicleRouteRepository.findAll();
        assertThat(jsonVehicleRouteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJsonVehicleRoute() throws Exception {
        // Initialize the database
        jsonVehicleRouteRepository.saveAndFlush(jsonVehicleRoute);
        int databaseSizeBeforeDelete = jsonVehicleRouteRepository.findAll().size();

        // Get the jsonVehicleRoute
        restJsonVehicleRouteMockMvc.perform(delete("/api/json-vehicle-routes/{id}", jsonVehicleRoute.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JsonVehicleRoute> jsonVehicleRouteList = jsonVehicleRouteRepository.findAll();
        assertThat(jsonVehicleRouteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JsonVehicleRoute.class);
        JsonVehicleRoute jsonVehicleRoute1 = new JsonVehicleRoute();
        jsonVehicleRoute1.setId(1L);
        JsonVehicleRoute jsonVehicleRoute2 = new JsonVehicleRoute();
        jsonVehicleRoute2.setId(jsonVehicleRoute1.getId());
        assertThat(jsonVehicleRoute1).isEqualTo(jsonVehicleRoute2);
        jsonVehicleRoute2.setId(2L);
        assertThat(jsonVehicleRoute1).isNotEqualTo(jsonVehicleRoute2);
        jsonVehicleRoute1.setId(null);
        assertThat(jsonVehicleRoute1).isNotEqualTo(jsonVehicleRoute2);
    }
}
