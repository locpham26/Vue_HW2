<template>
  <div class="page-container">
    <div class="head-container">
      <div class="text-wrapper">User management</div>
      <div>
        <a-button class="user-btn show-btn" @click="fetchUsers()"
          >Show All Users</a-button
        >
        <a-button class="user-btn add-btn" @click="addModalVisible = true"
          >Add a User</a-button
        >
      </div>
    </div>
    <a-table :columns="columns" :data-source="users" :pagination="false">
      <span slot="userOperations" slot-scope="record">
        <a-button class="user-btn edit-btn" @click="onEdit(record.key)"
          >Edit</a-button
        >
        <a-button class="user-btn delete-btn" @click="onDelete(record.key)"
          >Delete</a-button
        >
      </span></a-table
    >
    <a-modal
      title="Edit a user"
      :visible="editDialogVisible"
      okText="Save Changes"
      cancelText="Close"
      @cancel="editDialogVisible = false"
      @ok="onConfirmEdit"
    >
      <a-row
        type="flex"
        align="middle"
        v-if="edited"
        :style="{ marginBottom: '10px' }"
      >
        <a-col :span="6">Name</a-col>
        <a-col :span="18">
          <div>{{ edited.name }}</div>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle" v-if="edited">
        <a-col :span="6">Salary</a-col>
        <a-col :span="18">
          <a-input v-model="edited.salary" />
        </a-col>
      </a-row>
    </a-modal>
    <a-modal
      title="Add a user"
      :visible="addModalVisible"
      cancelText="Close"
      okText="Add"
      @cancel="addModalVisible = false"
      @ok="onConfirmAdd"
    >
      <a-space direction="vertical" :size="8" :style="{ width: '100%' }">
        <a-row type="flex" align="middle" :style="{ marginBottom: '10px' }">
          <a-col :span="4">Name</a-col>
          <a-col :span="20">
            <a-input v-model="addUserForm.name" />
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" :style="{ marginBottom: '10px' }">
          <a-col :span="4">Company</a-col>
          <a-col :span="20">
            <a-input v-model="addUserForm.company" />
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" :style="{ marginBottom: '10px' }">
          <a-col :span="4">Salary</a-col>
          <a-col :span="20">
            <a-input v-model="addUserForm.salary" />
          </a-col>
        </a-row>
      </a-space>
    </a-modal>
  </div>
</template>

<script>
import { findAllUsers, deleteUser, updateUser, saveUser } from "@/api";

export default {
  name: "Home",
  data() {
    return {
      columns: [
        {
          title: "Index",
          dataIndex: "index",
          key: "index",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "IsActive",
          dataIndex: "isActive",
          key: "isActive",
        },
        {
          title: "Salary",
          dataIndex: "salary",
          key: "salary",
        },
        {
          title: "Company",
          dataIndex: "company",
          key: "company",
        },
        {
          title: "Operations",
          key: "operations",
          scopedSlots: { customRender: "userOperations" },
        },
      ],
      users: [],
      edited: null,
      addModalVisible: false,
      addUserForm: {
        name: "",
        company: "",
        salary: "",
      },
      editDialogVisible: false,
    };
  },
  methods: {
    async fetchUsers() {
      console.log("fetching");
      const { data } = await findAllUsers();
      const userData = data.data.map((user, i) => {
        return {
          key: user.id,
          index: i + 1,
          name: user.name,
          isActive: user.active ? "true" : "false",
          salary: user.salary,
          company: user.company,
        };
      });
      this.users = userData;
    },
    async onConfirmAdd() {
      await saveUser({ id: "123456789", ...this.addUserForm });
      this.fetchUsers();
      this.addModalVisible = false;
    },
    onEdit(userId) {
      const edited = this.users.find((user) => user.key === userId);
      this.edited = { ...edited };
      this.editDialogVisible = true;
    },
    async onDelete(userId) {
      await deleteUser(userId);
      this.fetchUsers();
    },
    async onConfirmEdit() {
      const updated = {
        id: this.edited.key,
        name: this.edited.name,
        salary: this.edited.salary,
        company: this.edited.company,
        isActive: this.edited.isActive,
      };
      await updateUser(updated);
      this.fetchUsers();
      this.editDialogVisible = false;
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 40px;
  .head-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    .text-wrapper {
      margin-bottom: 10px;
    }
  }
  .user-btn {
    color: white !important;
    outline: none !important;
    border: none !important;
  }
  .edit-btn {
    background: rgb(7, 163, 163);
    margin-right: 10px;
    &:hover,
    &:focus {
      background: rgb(8, 129, 129);
    }
  }
  .delete-btn {
    background: rgb(219, 12, 12);
    &:hover,
    &:focus {
      background: rgb(146, 12, 12);
    }
  }

  .show-btn {
    background: rgb(5, 155, 5);
    margin-right: 10px;
    &:hover,
    &:focus {
      background: rgb(8, 110, 8);
    }
  }

  .add-btn {
    background: rgb(29, 29, 226);
    &:hover,
    &:focus {
      background: rgb(19, 19, 128);
    }
  }
}
</style>
