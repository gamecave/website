import { reducer as voxeetReducer } from "@voxeet/react-components"
import React from "react"
import thunkMidleware from "redux-thunk"
import { combineReducers, createStore, applyMiddleware } from "redux"

import { ConferenceRoom, VoxeetProvider } from "@voxeet/react-components"

// Import Style
import "@voxeet/react-components/dist/voxeet-react-components.css"

const reducers = combineReducers({
  voxeet: voxeetReducer,
})

const configureStore = () =>
  createStore(reducers, applyMiddleware(thunkMidleware))



function App({session_id, username}) {
  const settings = {
    consumerKey: process.env.REACT_APP_DOLBY_KEY,
    consumerSecret: process.env.REACT_APP_DOLBY_SECRET,
    conferenceAlias: session_id
  }

  return (
    <VoxeetProvider store={configureStore()}>
      <ConferenceRoom
        autoJoin
        consumerKey={settings.consumerKey}
        consumerSecret={settings.consumerSecret}
        conferenceAlias={settings.conferenceAlias}
        displayActions={["mute", "video", "recording", "live", "attendees", "chat"]}
        userInfo={{name: username}}
      />
    </VoxeetProvider>
  )
}

export default App