import { BaseEntity } from './../../shared';

export class JsonVehicleRoutingSolution implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public feasible?: boolean,
        public distance?: string,
        public customerLists?: BaseEntity[],
        public vehicleRouteLists?: BaseEntity[],
    ) {
        this.feasible = false;
    }
}
