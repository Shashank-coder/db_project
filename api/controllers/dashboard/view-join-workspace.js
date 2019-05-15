module.exports = {


  friendlyName: 'View join workspace',


  description: 'Display "Join workspace" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/join-workspace'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.

    // retreive all the invitations sent to the current user that are pending

    var userId = this.req.me.id;

    var workspaceInviteRecord = await WorkspaceInvite.find({
      receiverUserId: this.req.me.id,
      inviteStatus: 'Pending'
    });

    var data = {};
    // var workspaceList = [];
    // var senderWorkspaceIds = [];
    for(var i=0; i<workspaceInviteRecord.length; i++){
      senderId = workspaceInviteRecord[i].workspaceMemberId;

      // senderWorkspaceIds[i] = senderId;

      var workspaceMemberRecord = await WorkspaceMembers.findOne({
        id: senderId
      });

      var workId = workspaceMemberRecord.workspaceId;

      var workspaceRecord = await Workspace.findOne({
        id: workId
      });

      var workName = workspaceRecord.workspaceName;

      data[workName] = senderId;
    }

    // console.log("view " + data);
    return exits.success({ 'data' : data });

  }


};
