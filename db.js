const sequelize = require('./config/database');
const { DataTypes } = require('@sequelize/core');

const Designation = require('./models/Designation')(sequelize, DataTypes);
const Role = require('./models/Role')(sequelize, DataTypes);
const Privilege = require('./models/Privilege')(sequelize, DataTypes); 
const DefectType = require('./models/DefectType')(sequelize, DataTypes);
const ReleaseType = require('./models/ReleaseType')(sequelize, DataTypes);
const Severity = require('./models/Severity')(sequelize, DataTypes); 
const Priority = require('./models/Priority')(sequelize, DataTypes);
const DefectStatus = require ('./models/DefectStatus')(sequelize, DataTypes);
const User = require ('./models/User')(sequelize, DataTypes);
const GroupPrivilege = require ('./models/GroupPrivilege')(sequelize, DataTypes);
const Project = require ('./models/Project')(sequelize, DataTypes);
const Module = require ('./models/Module')(sequelize, DataTypes);
const SubModule = require ('./models/SubModule')(sequelize, DataTypes);
const ProjectUserPrivilege = require('./models/ProjectUserPrivilege')(sequelize, DataTypes);
const ProjectAllocationHistory = require('./models/ProjectAllocationHistory')(sequelize, DataTypes);
const ProjectAllocation = require ('./models/ProjectAllocation' )( sequelize, DataTypes);
const Release = require ('./models/Release')(sequelize, DataTypes);
const ReleaseTestCase = require ('./models/ReleaseTestCase')(sequelize, DataTypes);
const TestCase = require ('./models/TestCase')(sequelize, DataTypes);
const Comment = require ('./models/Comment')(sequelize, DataTypes);
const Defect = require ('./models/Defect')(sequelize, DataTypes);
const DefectHistory = require ('./models/DefectHistory')(sequelize, DataTypes);
const Bench = require ('./models/Bench')(sequelize, DataTypes);
const EmailUser = require ('./models/EmailUser')(sequelize, DataTypes);
const SmtpConfig = require ('./models/SmtpConfig')(sequelize, DataTypes);
const UserPrivilege = require ('./models/UserPrivilege')(sequelize, DataTypes);
const AllocateModule = require ('./models/AllocateModule')(sequelize, DataTypes);

//--------   Add association after models are initialized ---------//

// User ↔ Designation
Designation.hasMany(User, { foreignKey: 'designation_id' });
User.belongsTo(Designation, { foreignKey: 'designation_id' });

// GroupPrivilege ↔ Role
Role.hasMany(GroupPrivilege, { foreignKey: 'role_id' });
GroupPrivilege.belongsTo(Role, { foreignKey: 'role_id' });

// GroupPrivilege ↔ Privilege
Privilege.hasMany(GroupPrivilege, { foreignKey: 'privilege_id' });
GroupPrivilege.belongsTo(Privilege, { foreignKey: 'privilege_id' });

// Project ↔ User
User.hasMany(Project, { foreignKey: 'user_id' });
Project.belongsTo(User, { foreignKey: 'user_id' });

// Module ↔ Project
Project.hasMany(Module, { foreignKey: 'project_id' });
Module.belongsTo(Project, { foreignKey: 'project_id' });

// SubModule ↔ Module
Module.hasMany(SubModule, { foreignKey: 'modules_id' });
SubModule.belongsTo(Module, { foreignKey: 'modules_id' });

// ProjectUserPrivilege ↔ Project
Project.hasMany(ProjectUserPrivilege, { foreignKey: 'project_id' });
ProjectUserPrivilege.belongsTo(Project, { foreignKey: 'project_id' });

// ProjectUserPrivilege ↔ User
User.hasMany(ProjectUserPrivilege, { foreignKey: 'user_id' });
ProjectUserPrivilege.belongsTo(User, { foreignKey: 'user_id' });

// ProjectUserPrivilege ↔ Privilege
Privilege.hasMany(ProjectUserPrivilege, { foreignKey: 'privilege_id' });
ProjectUserPrivilege.belongsTo(Privilege, { foreignKey: 'privilege_id' });

// ProjectAllocationHistory ↔ Project
Project.hasMany(ProjectAllocationHistory, { foreignKey: 'project_id' });
ProjectAllocationHistory.belongsTo(Project, { foreignKey: 'project_id' });

// ProjectAllocationHistory ↔ Role
Role.hasMany(ProjectAllocationHistory, { foreignKey: 'role_id' });
ProjectAllocationHistory.belongsTo(Role, { foreignKey: 'role_id' });

// ProjectAllocationHistory ↔ User
User.hasMany(ProjectAllocationHistory, { foreignKey: 'user_id' });
ProjectAllocationHistory.belongsTo(User, { foreignKey: 'user_id' });

// ProjectAllocation ↔ Project
Project.hasMany(ProjectAllocation, { foreignKey: 'project_id' });
ProjectAllocation.belongsTo(Project, { foreignKey: 'project_id' });

// ProjectAllocation ↔ Role
Role.hasMany(ProjectAllocation, { foreignKey: 'role_id' });
ProjectAllocation.belongsTo(Role, { foreignKey: 'role_id' });

// ProjectAllocation ↔ User
User.hasMany(ProjectAllocation, { foreignKey: 'user_id' });
ProjectAllocation.belongsTo(User, { foreignKey: 'user_id' });

// Release ↔ Project
Project.hasMany(Release, { foreignKey: 'project_id' });
Release.belongsTo(Project, { foreignKey: 'project_id' });

// Release ↔ ReleaseType
ReleaseType.hasMany(Release, { foreignKey: 'release_type_id' });
Release.belongsTo(ReleaseType, { foreignKey: 'release_type_id' });

// ReleaseTestCase ↔ User
User.hasMany(ReleaseTestCase, { foreignKey: 'owner_id' });
ReleaseTestCase.belongsTo(User, { foreignKey: 'owner_id' });

// ReleaseTestCase ↔ Release
Release.hasMany(ReleaseTestCase, { foreignKey: 'release_id' });
ReleaseTestCase.belongsTo(Release, { foreignKey: 'release_id' });

// ReleaseTestCase ↔ TestCase
TestCase.hasMany(ReleaseTestCase, { foreignKey: 'test_case_id' });
ReleaseTestCase.belongsTo(TestCase, { foreignKey: 'test_case_id' });

// Testcase ↔ DefectType
DefectType.hasMany(TestCase, { foreignKey: 'type_id' });
TestCase.belongsTo(DefectType, { foreignKey: 'type_id' });

// Testcase ↔ Module
Module.hasMany(TestCase, { foreignKey: 'module_id' });
TestCase.belongsTo(Module, { foreignKey: 'module_id' });

// Testcase ↔ Project
Project.hasMany(TestCase, { foreignKey: 'project_id' });
TestCase.belongsTo(Project, { foreignKey: 'project_id' });

// Testcase ↔ Severity
Severity.hasMany(TestCase, { foreignKey: 'severity_id' });
TestCase.belongsTo(Severity, { foreignKey: 'severity_id' });

// Testcase ↔ Submodule
SubModule.hasMany(TestCase, { foreignKey: 'sub_module_id' });
TestCase.belongsTo(SubModule, { foreignKey: 'sub_module_id' });

// Comment ↔ Defect
Defect.hasMany(Comment, { foreignKey: 'defect_id' });
Comment.belongsTo(Defect, { foreignKey: 'defect_id' });

// Comment ↔ User
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// Defect ↔ Project
Project.hasMany(Defect, { foreignKey: 'project_id' });
Defect.belongsTo(Project, { foreignKey: 'project_id' });

// Defect ↔ Module
Module.hasMany(Defect, { foreignKey: 'modules_id' });
Defect.belongsTo(Module, { foreignKey: 'modules_id' });

// Defect ↔ SubModule
SubModule.hasMany(Defect, { foreignKey: 'sub_module_id' });
Defect.belongsTo(SubModule, { foreignKey: 'sub_module_id' });

// Defect ↔ Severity
Severity.hasMany(Defect, { foreignKey: 'severity_id' });
Defect.belongsTo(Severity, { foreignKey: 'severity_id' });

// Defect ↔ Priority
Priority.hasMany(Defect, { foreignKey: 'priority_id' });
Defect.belongsTo(Priority, { foreignKey: 'priority_id' });

// Defect ↔ DefectStatus
DefectStatus.hasMany(Defect, { foreignKey: 'defect_status_id' });
Defect.belongsTo(DefectStatus, { foreignKey: 'defect_status_id' });

// Defect ↔ Type
DefectType.hasMany(Defect, { foreignKey: 'type_id' });
Defect.belongsTo(DefectType, { foreignKey: 'type_id' });

// Defect ↔ ReleaseTestCase
ReleaseTestCase.hasMany(Defect, { foreignKey: 'release_test_case_id' });
Defect.belongsTo(ReleaseTestCase, { foreignKey: 'release_test_case_id' });

// ================= User → Defects assigned BY them =================
Defect.belongsTo(User, { foreignKey: 'assigned_by', as: 'AssignedBy' });
User.hasMany(Defect, { foreignKey: 'assigned_by', as: 'AssignedByDefects', inverse: { as: 'AssignedBy' } });

// ================= User → Defects assigned TO them =================
Defect.belongsTo(User, { foreignKey: 'assigned_to', as: 'AssignedTo' });
User.hasMany(Defect, { foreignKey: 'assigned_to', as: 'AssignedToDefects', inverse: { as: 'AssignedTo' } });

// DefectHistory ↔ Defect
Defect.hasMany(DefectHistory, { foreignKey: 'defect_id' });
DefectHistory.belongsTo(Defect, { foreignKey: 'defect_id' });

// DefectHistory ↔ Release
//Release.hasMany(DefectHistory, { foreignKey: 'release_id' });
//DefectHistory.belongsTo(Release, { foreignKey: 'release_id' });

// Bench ↔ User
User.hasMany(Bench, { foreignKey: 'user_id' });
Bench.belongsTo(User, { foreignKey: 'user_id' });

// EmailUser ↔ User
User.hasOne(EmailUser, { foreignKey: 'user_id' });
EmailUser.belongsTo(User, { foreignKey: 'user_id' });

// UserPrivilege ↔  User 
User.hasMany(UserPrivilege, { foreignKey: 'user_id' });
UserPrivilege.belongsTo(User, { foreignKey: 'user_id' });

// UserPrivilege ↔ Project
Project.hasMany(UserPrivilege, { foreignKey: 'project_id' });
UserPrivilege.belongsTo(Project, { foreignKey: 'project_id' });

// UserPrivilege ↔ Privilege
Privilege.hasMany(UserPrivilege, { foreignKey: 'privilege_id' });
UserPrivilege.belongsTo(Privilege, { foreignKey: 'privilege_id' });

// AllocateModule ↔ User 
User.hasMany(AllocateModule, { foreignKey: 'user_id' });
AllocateModule.belongsTo(User, { foreignKey: 'user_id' });

// AllocateModule ↔ Project 
Project.hasMany(AllocateModule, { foreignKey: 'project_id' });
AllocateModule.belongsTo(Project, { foreignKey: 'project_id' });

// AllocateModule ↔ Module
Module.hasMany(AllocateModule, { foreignKey: 'modules_id' });
AllocateModule.belongsTo(Module, { foreignKey: 'modules_id' });

// AllocateModule ↔ SubModule
SubModule.hasMany(AllocateModule, { foreignKey: 'sub_module_id' });
AllocateModule.belongsTo(SubModule, { foreignKey: 'sub_module_id' });


const db = {
  sequelize,
  Sequelize: sequelize.constructor,
  Designation,
  Role,
  Privilege,
  DefectType,
  ReleaseType,
  Severity,
  Priority,
  DefectStatus,
  User,
  GroupPrivilege,
  Project,
  SubModule,
  ProjectUserPrivilege,
  ProjectAllocationHistory,
  ProjectAllocation,
  Release,
  ReleaseTestCase,
  TestCase,
  Comment,
  Defect,
  DefectHistory,
  Bench,
  EmailUser,
  SmtpConfig,
  UserPrivilege,
  AllocateModule,
  Module,
};

module.exports = db;
