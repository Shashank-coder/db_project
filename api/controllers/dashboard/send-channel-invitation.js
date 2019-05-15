module.exports = {


  friendlyName: 'Send channel invitation',


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

    channelName: {
      type: 'string',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.

    // check if the channel exists
    var channelRecord = await Channels.findOne({
      channelName: inputs.channelName,
    });

    if(channelRecord === undefined){
      console.log("This channel does not exists!")
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus });      
    }

    // check if the invitation sender is a channel member
    var channelMemberRecord = await ChannelMembers.findOne({
      channelName: inputs.channelName,
      emailAddress: this.req.me.emailAddress
    });

    if(channelMemberRecord === undefined){
      console.log("You are not authorized to send channel invitation for this channel!")
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus });      
    }

    var senderId = channelMemberRecord.id;

    // check if the receiver is a registered user
    var userRecord = await User.findOne({
      emailAddress: inputs.emailAddress,
    });

    if(userRecord === undefined){
      console.log("The email Address does not belong to a registered user!")
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus });      
    }

    var receiverId = userRecord.id;

    // check if the receiver is the workspace member
    var workspaceMemberRecord = await WorkspaceMembers.findOne({
      workspaceId: inputs.workspaceId,
      userId: receiverId,
    });

    if(workspaceMemberRecord === undefined){
      console.log("The user is not present in this workspace!")
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus });      
    }

    var receiverUserId = workspaceMemberRecord.id;

    // check if the invitaion has already been sent to the receiver
    var channelInviteRecordCheck = await ChannelInvite.findOne({
      senderId: senderId,
      receiverUserId: receiverUserId,
    });

    if(channelInviteRecordCheck){
      console.log("The user has already been sent an invitation!")
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus }); 
    }

    // check if the receiver is already a channel member
    var channelMemberRecordCheck = await ChannelMembers.findOne({
      channelName: inputs.channelName,
      emailAddress: inputs.emailAddress
    });

    if(channelMemberRecordCheck){
      console.log("The user is already a member of this channel!")
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus }); 
    }

    // create a channel invitaion record
    var newChannelInviteRecord = await ChannelInvite.create(_.extend({
      channelName: inputs.channelName,
      senderId: senderId,
      receiverUserId: receiverUserId,
      inviteStatus: 'Pending',
      createdAt: Date.now()
    }))
    .fetch();

    var cstatus = "200";
    return exits.success({ APIstatus : cstatus });


  }


};
