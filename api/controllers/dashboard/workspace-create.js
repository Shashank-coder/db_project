module.exports = {


  friendlyName: 'Workspace create',


  description: 'Create a new Workspace.',


  inputs: {

    workspaceName: {
      required: true,
      type: 'string',
      description: 'Name of the workspace, e.g. Research Group.',
    },

    workspaceDesc:  {
      required: true,
      type: 'string',
      description: 'Describe the use of workspace.',
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.
    var workspaceName = inputs.workspaceName;
    console.log(workspaceName);

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newWorkspaceRecord = await Workspace.create(_.extend({
      workspaceName: workspaceName,
      workspaceDesc: inputs.workspaceDesc,
      createdAt: Date.now(),
      createdBy: this.req.me.id
    }))
    .fetch();

    console.log(newWorkspaceRecord);

    // Adding the user who created this workspace as admin in workspaceMembers table
    var newWorkspaceMemberRecord = await WorkspaceMembers.create(_.extend({
      workspaceId: newWorkspaceRecord.id,
      userId: this.req.me.id,
      joinedAt: Date.now(),
      memberType: 'Admin'
    }))
    .fetch();

    var cstatus = "200";
    return exits.success({ APIstatus : cstatus });

  }


};
