module.exports = {


  friendlyName: 'View send channel invitation',


  description: 'Display "Send channel invitation" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/send-channel-invitation'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
