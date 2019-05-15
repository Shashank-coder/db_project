module.exports = {


  friendlyName: 'Change workspace',


  description: '',


  inputs: {

    workspaceName: {
      type: 'string',
      required: true
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.
    _workspaceName = inputs.workspaceName;
    console.log(_workspaceName);

    var cstatus = "200";
    return exits.success({ APIstatus : cstatus});

  }


};
