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

    /**
     * Creates a new entity from a list of available entities and returns it.
     */
    createEntity(): Entity {
        assert(this.livingEntityCount < MAX_ENTITIES, 'Too many entities in existence.') 
        const entity = this.availableEntities.shift() 
        assert(entity !== undefined, 'No new entities available.')
        ++this.livingEntityCount
        return entity 
    }

    /**
     * Destroys the given entity and puts its ID back to the available entities.
     */
    destroyEntity(entity: Entity): void {
        assert(entity < MAX_ENTITIES, 'Entity out of range.') 
        this.signatures.delete(entity)
        this.availableEntities.push(entity)
        --this.livingEntityCount
    }

    /**
     * Sets a signatue for the given Entity.
     */
    setSignature(entity: Entity, signature: Signature): void {
        assert(entity < MAX_ENTITIES, 'Entity out of range.') 
        this.signatures.set(entity, signature)
    }

    /**
     * Get an entity's signature.
     */
    getSignature(entity: Entity): Signature {
        assert(entity < MAX_ENTITIES, 'Entity out of range.') 
        const signature = this.signatures.get(entity)
        assert(signature !== undefined, 'Entity not found')
        return signature
    }
}
