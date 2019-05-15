module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    var workspaceMemberRecord = await WorkspaceMembers.find({
      userId: this.req.me.id
    });

    var workspaceNames = []
    var workspaceIds = []
    for(var i=0; i < workspaceMemberRecord.length; i++){
      var workId = workspaceMemberRecord[i].workspaceId;
      workspaceIds[i] = workId;
      var workspaceRecord = await Workspace.findOne({
        id: workId
      });

      workspaceNames[i] = workspaceRecord.workspaceName;

    }

    return exits.success({'workspaces': workspaceNames, 'workspaceIds': workspaceIds});

  }


};
