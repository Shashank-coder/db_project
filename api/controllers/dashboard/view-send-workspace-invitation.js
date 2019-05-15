module.exports = {


  friendlyName: 'View send workspace invitation',


  description: 'Display "Send workspace invitation" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/send-workspace-invitation'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
