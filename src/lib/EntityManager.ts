import { Entity, Signature } from "../types";
import { MAX_ENTITIES } from "./contants";

export class EntityManager {
    // Queue of unused entity ID's
    availableEntities: Entity[]

    // Map of signatures where the index corresponds to the entity ID
    signatures: Map<Entity, Signature>

    // Total living entities - used to keep limits on how many exists
    livingEntityCount: number

    constructor() {
        this.availableEntities = []
        this.signatures = new Map()
        this.livingEntityCount = 0

        for (let entity: Entity = 0; entity < MAX_ENTITIES; ++entity) {
            this.availableEntities.push(entity)
        }
    }
}
