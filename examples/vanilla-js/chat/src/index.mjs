import "./styles.css";

function render() {
  const container = document.getElementById('app')
  EmbeddedSearch.renderChat(container, {
    /**
     * The ID of the application used to determine the configuration of underlying chat processes.
     * This should correspond to the ID used with the AI App builder.
     * @type {string=}
     */
    applicationId: undefined,

    /**
     * An optional opaque id that stores the context of the current / new chat for the current session.
     * @type {string=}
     */
    chatId: undefined,

    /**
     * Optional style customizations
     * @type {ChatCustomizations=}
     */
    customizations: {
      container: {
        /** The CSS border of the widget box */
        border: 'none',
        /** The border radius of the widget box */
        borderRadius: undefined,
        /** The CSS box-shadow of the widget box */
        boxShadow: undefined,
        /** A CSS margin to the left and right of the widget box */
        horizontalMargin: undefined,
        /** A CSS margin above and below the widget box */
        verticalMargin: undefined,
      },
    },

    /**
     * Specifies the message sent by the user to initiate the chat.
     * @type {string=} [initialMessage]
     */
    initialMessage: undefined,

    /**
     * A callback invoked when the user initiates a chat.
     * @type {(chatId?: string) => void=}
     */
    onChat: (chatId) => {
      console.log(`Chat initiated with ID: ${chatId}`);
    },
  })
}

document.addEventListener('DOMContentLoaded', render)