module.exports = {


  friendlyName: 'Send workspace invitation',


  description: '',


  inputs: {

    emailAddress: {
      type: 'string',
      required: true
    },

    workspaceId: {
      type: 'number',
      required: true,
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.

    var workspaceId = inputs.workspaceId;
    console.log(workspaceId);

    var emailAddress = inputs.emailAddress;

    // check if the sender is authorized to send invitations
    var workspaceMemberRecord = await WorkspaceMembers.findOne({
      workspaceId: inputs.workspaceId,
      userId: this.req.me.id
    });

    if(workspaceMemberRecord === undefined){
      console.log("Unauthorized to send an invitation in this workspace!");
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus });

    }

    var workspaceMemberId = workspaceMemberRecord.id;

    // check if the invitation sent to the user is a registered user
    var userRecord = await User.findOne({
      emailAddress: emailAddress
    });

    if(userRecord === undefined){
      console.log("User is not on Slack");
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus });
    }

    var userId = userRecord.id;

    // check if the receiver is already a member of the workspace
    var workspaceMemberRecordCheck = await WorkspaceMembers.findOne({
      workspaceId: inputs.workspaceId,
      userId: userId
    });

    if(workspaceMemberRecordCheck){
      console.log("User is already a Member of this workspace!");
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus });
    }

    // check if the invitation is already sent
    var workspaceInviteRecord = await WorkspaceInvite.findOne({
      workspaceMemberId: workspaceMemberId,
      receiverUserId: userId
    });

    if(workspaceInviteRecord){
      console.log("Invitation already sent!");
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus }); 
    }

    var newWorkspaceInviteRecord = await WorkspaceInvite.create(_.extend({
      workspaceMemberId: workspaceMemberId,
      receiverUserId: userId,
      inviteStatus: 'Pending',
      createdAt: Date.now()
    }))
    .fetch();

    var cstatus = "200";
    return exits.success({ APIstatus : cstatus });

  }


};
