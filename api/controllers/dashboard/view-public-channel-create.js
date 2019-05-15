module.exports = {


  friendlyName: 'View public channel create',


  description: 'Display "Public channel create" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/public-channel-create'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
