package org.optaplanner.webexamples.service.impl;

import org.optaplanner.core.api.score.buildin.hardsoftlong.HardSoftLongScore;
import org.optaplanner.examples.vehiclerouting.domain.Customer;
import org.optaplanner.examples.vehiclerouting.domain.Vehicle;
import org.optaplanner.examples.vehiclerouting.domain.VehicleRoutingSolution;
import org.optaplanner.examples.vehiclerouting.domain.location.Location;
import org.optaplanner.swing.impl.TangoColorFactory;
import org.optaplanner.webexamples.domain.JsonCustomer;
import org.optaplanner.webexamples.domain.JsonMessage;
import org.optaplanner.webexamples.domain.JsonVehicleRoute;
import org.optaplanner.webexamples.domain.JsonVehicleRoutingSolution;
import org.optaplanner.webexamples.repository.JsonVehicleRoutingSolutionRepository;
import org.optaplanner.webexamples.service.JsonVehicleRoutingSolutionService;
import org.optaplanner.webexamples.web.rest.cdi.VehicleRoutingSolverManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.*;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Service Implementation for managing JsonVehicleRoutingSolution.
 */
@Service
@Transactional
public class JsonVehicleRoutingSolutionServiceImpl implements JsonVehicleRoutingSolutionService {

    private final Logger log = LoggerFactory.getLogger(JsonVehicleRoutingSolutionServiceImpl.class);

    private final JsonVehicleRoutingSolutionRepository jsonVehicleRoutingSolutionRepository;

    private static final NumberFormat NUMBER_FORMAT = new DecimalFormat("#,##0.00");

    private VehicleRoutingSolverManager solverManager;

    public JsonVehicleRoutingSolutionServiceImpl(JsonVehicleRoutingSolutionRepository jsonVehicleRoutingSolutionRepository) {
        this.jsonVehicleRoutingSolutionRepository = jsonVehicleRoutingSolutionRepository;
        solverManager = new VehicleRoutingSolverManager();
    }

    /**
     * Save a jsonVehicleRoutingSolution.
     *
     * @param jsonVehicleRoutingSolution the entity to save
     * @return the persisted entity
     */
    @Override
    public JsonVehicleRoutingSolution save(JsonVehicleRoutingSolution jsonVehicleRoutingSolution) {
        log.debug("Request to save JsonVehicleRoutingSolution : {}", jsonVehicleRoutingSolution);
        return jsonVehicleRoutingSolutionRepository.save(jsonVehicleRoutingSolution);
    }

    /**
     * Get all the jsonVehicleRoutingSolutions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<JsonVehicleRoutingSolution> findAll() {
        log.debug("Request to get all JsonVehicleRoutingSolutions");
        return jsonVehicleRoutingSolutionRepository.findAll();
    }

    /**
     * Get one jsonVehicleRoutingSolution by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public JsonVehicleRoutingSolution findOne(Long id) {
        log.debug("Request to get JsonVehicleRoutingSolution : {}", id);
        return jsonVehicleRoutingSolutionRepository.findOne(id);
    }

    /**
     * Delete the jsonVehicleRoutingSolution by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete JsonVehicleRoutingSolution : {}", id);
        jsonVehicleRoutingSolutionRepository.delete(id);
    }

    @Override
    public JsonVehicleRoutingSolution getSolution() {
        VehicleRoutingSolution solution = solverManager.retrieveOrCreateSolution("dummy");
        return convertToJsonVehicleRoutingSolution(solution);
    }

    @Override
    public JsonMessage solve() {
        boolean success = solverManager.solve("dummy");
        return new JsonMessage().text(success ? "Solving started." : "Solver was already running.");
    }

    @Override
    public JsonMessage terminateEarly() {
        boolean success = solverManager.terminateEarly("dummy");
        return new JsonMessage().text(success ? "Solver terminating early." : "Solver was already terminated.");
    }

    protected JsonVehicleRoutingSolution convertToJsonVehicleRoutingSolution(VehicleRoutingSolution solution) {
        JsonVehicleRoutingSolution jsonSolution = new JsonVehicleRoutingSolution();
        jsonSolution.setName(solution.getName());
        Set<JsonCustomer> jsonCustomerList = new HashSet<>(solution.getCustomerList().size());
        for (Customer customer : solution.getCustomerList()) {
            Location customerLocation = customer.getLocation();
            jsonCustomerList.add(new JsonCustomer()
                .locationName(customerLocation.getName())
                .latitude(customerLocation.getLatitude())
                .longitude(customerLocation.getLongitude())
                .demand(customer.getDemand()));
        }
        jsonSolution.setCustomerLists(jsonCustomerList);
        Set<JsonVehicleRoute> jsonVehicleRouteList = new HashSet<>(solution.getVehicleList().size());
        TangoColorFactory tangoColorFactory = new TangoColorFactory();
        for (Vehicle vehicle : solution.getVehicleList()) {
            JsonVehicleRoute jsonVehicleRoute = new JsonVehicleRoute();
            Location depotLocation = vehicle.getDepot().getLocation();
            jsonVehicleRoute.setDepotLocationName(depotLocation.getName());
            jsonVehicleRoute.setDepotLatitude(depotLocation.getLatitude());
            jsonVehicleRoute.setDepotLongitude(depotLocation.getLongitude());
            jsonVehicleRoute.setCapacity(vehicle.getCapacity());
            Color color = tangoColorFactory.pickColor(vehicle);
            jsonVehicleRoute.setHexColor(
                String.format("#%02x%02x%02x", color.getRed(), color.getGreen(), color.getBlue()));
            Customer customer = vehicle.getNextCustomer();
            int demandTotal = 0;
            Set<JsonCustomer> jsonVehicleCustomerList = new HashSet<>();
            while (customer != null) {
                Location customerLocation = customer.getLocation();
                demandTotal += customer.getDemand();
                jsonVehicleCustomerList.add(new JsonCustomer()
                    .locationName(customerLocation.getName())
                    .latitude(customerLocation.getLatitude())
                    .longitude(customerLocation.getLongitude())
                    .demand(customer.getDemand()));
                customer = customer.getNextCustomer();
            }
            jsonVehicleRoute.setDemandTotal(demandTotal);
            jsonVehicleRoute.setCustomerLists(jsonVehicleCustomerList);
            jsonVehicleRouteList.add(jsonVehicleRoute);
        }
        jsonSolution.setVehicleRouteLists(jsonVehicleRouteList);
        HardSoftLongScore score = solution.getScore();
        jsonSolution.setFeasible(score != null && score.isFeasible());
        jsonSolution.setDistance(solution.getDistanceString(NUMBER_FORMAT));
        return jsonSolution;
    }
}
