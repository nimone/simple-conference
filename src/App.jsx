import humanId from "human-id"
import "./App.css"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

function App() {
  let roomID = window.location.pathname.slice(1)

  if (!roomID) {
    roomID = humanId({ separator: "-", capitalize: false })
    window.history.pushState({}, "", "/" + roomID)
  }

  let roomRef = (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      Number(import.meta.env.VITE_APP_ID),
      import.meta.env.VITE_SERVER_SECRET,
      roomID,
      humanId(),
      humanId({ adjectiveCount: 0 })
    )

    const zp = ZegoUIKitPrebuilt.create(kitToken)

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Room Link",
          url: window.location.href,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    })
  }

  return (
    <main>
      <div style={{ height: "100vh" }} ref={roomRef} />
    </main>
  )
}

export default App
