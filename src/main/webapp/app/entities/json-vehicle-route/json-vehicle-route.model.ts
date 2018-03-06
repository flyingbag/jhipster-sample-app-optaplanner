import { BaseEntity } from './../../shared';

export class JsonVehicleRoute implements BaseEntity {
    constructor(
        public id?: number,
        public depotLocationName?: string,
        public depotLatitude?: number,
        public depotLongitude?: number,
        public hexColor?: string,
        public capacity?: number,
        public demandTotal?: number,
        public customerLists?: BaseEntity[],
    ) {
    }
}
