import { Router } from 'express'
import type { Model } from 'mongoose'

type ResourceModel = Model<any>

function createResourceRouter(model: ResourceModel) {
  const router = Router()

  router.get('/', async (_request, response) => {
    try {
      response.json(await model.find().lean())
    } catch (error) {
      response.status(500).json({ error: 'Unable to load resources', details: error instanceof Error ? error.message : error })
    }
  })

  router.post('/', async (request, response) => {
    try {
      const resource = await model.create(request.body)
      response.status(201).json(resource)
    } catch (error) {
      response.status(400).json({ error: 'Unable to create resource', details: error instanceof Error ? error.message : error })
    }
  })

  router.get('/:id', async (request, response) => {
    try {
      const resource = await model.findById(request.params.id).lean()
      if (!resource) {
        response.status(404).json({ error: 'Resource not found' })
        return
      }
      response.json(resource)
    } catch (error) {
      response.status(400).json({ error: 'Invalid resource id', details: error instanceof Error ? error.message : error })
    }
  })

  router.patch('/:id', async (request, response) => {
    try {
      const resource = await model.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }).lean()
      if (!resource) {
        response.status(404).json({ error: 'Resource not found' })
        return
      }
      response.json(resource)
    } catch (error) {
      response.status(400).json({ error: 'Unable to update resource', details: error instanceof Error ? error.message : error })
    }
  })

  router.delete('/:id', async (request, response) => {
    try {
      const resource = await model.findByIdAndDelete(request.params.id).lean()
      if (!resource) {
        response.status(404).json({ error: 'Resource not found' })
        return
      }
      response.status(204).send()
    } catch (error) {
      response.status(400).json({ error: 'Unable to delete resource', details: error instanceof Error ? error.message : error })
    }
  })

  return router
}

export { createResourceRouter }