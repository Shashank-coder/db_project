module.exports = {


  friendlyName: 'Join workspace',


  description: '',


  inputs: {

    workspaceName: {
      type: 'string',
      required: true
    },

    senderId: {
      type: 'number',
      required: true
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    console.log(inputs.workspaceName);
    console.log(inputs.senderId);
    // All done.
    var userId = this.req.me.id;
    var workspaceName = inputs.workspaceName;
    var senderWorkspaceId = inputs.senderId;

    // check if the workspace exist
    var workspaceRecord = await Workspace.findOne({
      workspaceName: workspaceName
    });

    if(workspaceRecord === undefined){
      console.log("This workspace no longer exists!");
      cstatus = "200";
      return exits.success({ APIstatus : cstatus });
    }

    var workspaceId = workspaceRecord.id;

    // check if the invitation exists
    var workspaceInviteRecord = await WorkspaceInvite.findOne({
      workspaceMemberId: senderWorkspaceId,
      receiverUserId: userId,
    });

    if(workspaceInviteRecord === undefined){
      console.log("This invitation no longer exists!");
      cstatus = "200";
      return exits.success({ APIstatus : cstatus });
    }

    
    // update the invitation to accepted
    var workspaceInviteRecordUpdate = await WorkspaceInvite.updateOne({
      workspaceMemberId: senderWorkspaceId,
      receiverUserId: userId
    }).set({
      inviteStatus: 'Accepted'
    });

    // check if the user is already a member
    var workspaceMemberRecord = await WorkspaceMembers.findOne({
      workspaceId: workspaceId,
      userId: userId

    });

    if(workspaceMemberRecord){
      console.log("User is already a member of this workspace!");
      cstatus = "200";
      return exits.success({ APIstatus : cstatus });
    }

    // add the user in the workspace members
    var newWorkspaceMemberRecord = await WorkspaceMembers.create(_.extend({
      workspaceId: workspaceId,
      userId: userId,
      joinedAt: Date.now(),
      memberType: 'Member'
    }))
    .fetch();

    cstatus = "200";
    return exits.success({ APIstatus : cstatus });

  }


};
