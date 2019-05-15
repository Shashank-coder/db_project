module.exports = {


  friendlyName: 'Public channel create',


  description: '',


  inputs: {

    channelName: {
      required: true,
      type: 'string',
      description: 'Name of the channel, e.g. Research Conference.',
    },

    workspaceId: {
      required: true,
      type: 'number',
      description: 'Id of the current workspace the user is working in.',
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.
    var channelName = inputs.channelName;
    console.log(inputs.workspaceId);
    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)

    var workspaceMemberRecord = await WorkspaceMembers.findOne({
      workspaceId: inputs.workspaceId,
      userId: this.req.me.id
    });

    if(workspaceMemberRecord === undefined){
      console.log("Unaothorized to create a channel in this workspace!");
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus });

    }

    var workspaceMemberId = workspaceMemberRecord.id;


    // check if the channel name already exists in the workspace
    var newChannelRecord = await Channels.findOne({
      workspaceId: inputs.workspaceId,
      channelName: channelName
    });        

    if(newChannelRecord){
      console.log("This channel name already exists!");
      var cstatus = "200";
      return exits.success({ APIstatus : cstatus });
    }

    var newChannelRecord = await Channels.create(_.extend({
      channelName: channelName,
      workspaceMemberId: workspaceMemberId,
      channelType: 'Public',
      createdAt: Date.now(),
      createdBy: this.req.me.id
    }))
    .fetch();


    var cstatus = "200";
    return exits.success({ APIstatus : cstatus });

  }


};
