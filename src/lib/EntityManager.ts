import { MAX_ENTITIES } from "./contants";
import { Entity, Signature } from "../types";
import { assert } from "./utils";

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

    createEntity(): Entity {
        assert(this.livingEntityCount < MAX_ENTITIES, 'Too many entities in existence.') 
        return 0
    }
}
