import { api } from '@shared/api'
import { attach } from 'effector'

export const signOutFx = attach({ effect: api.auth.signOutFx })
