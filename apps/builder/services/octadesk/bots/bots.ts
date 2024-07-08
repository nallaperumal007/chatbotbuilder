import { headers, services } from '@octadesk-tech/services'
import { BotsServicesInterface } from './types.bots'

let _clientChat: any
const getChatClient = async () => {
  if (_clientChat) {
    return _clientChat
  }
  return (_clientChat = await services.chat.getClient())
}

export const BotsService = (): BotsServicesInterface => {
  const getBotSpecifications = async () => {
    const { data } = await getChatClient().then(client =>
      client.get(`integrator?active=true`, headers.getAuthorizedHeaders())
    )
  
    return data
  }

  const getBots = async (channel: string, version: number) => {
    const { data } = await getChatClient().then(client => client.get(
      `flux/slim/bot?channel=${channel}&version=${version}`,
      headers.getAuthorizedHeaders()
    ))

    return data
  }

  return {
    getBotSpecifications,
    getBots
  }
} 

