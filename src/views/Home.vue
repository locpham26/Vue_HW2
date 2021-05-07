<template>
  <div class="page-container">
    <div class="head-container">
      <div class="text-wrapper">Book Store</div>
      <div>
        <a-button class="user-btn show-btn" @click="showAllUsers()"
          >Show All Books</a-button
        >
        <a-button class="user-btn add-btn" @click="addModalVisible = true"
          >Add a Book</a-button
        >
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="users"
      :pagination="false"
      v-if="showAll"
    >
      <span slot="operations" slot-scope="record">
        <a-button class="user-btn edit-btn" @click="onEdit(record.id)"
          >Edit</a-button
        >
        <a-button class="user-btn delete-btn" @click="onDelete(record.id)"
          >Delete</a-button
        >
      </span></a-table
    >
    <a-modal
      title="Edit a book"
      :visible="editDialogVisible"
      okText="Save Changes"
      cancelText="Close"
      @cancel="editDialogVisible = false"
      @ok="onConfirmEdit"
    >
      <a-row type="flex" align="middle" v-if="edited">
        <a-col :span="6">Title</a-col>
        <a-col :span="18">
          <a-input v-model="edited.title" />
        </a-col>
      </a-row>
      <a-row type="flex" align="middle" v-if="edited">
        <a-col :span="6">Description</a-col>
        <a-col :span="18">
          <a-input v-model="edited.description" />
        </a-col>
      </a-row>
      <a-row type="flex" align="middle" v-if="edited">
        <a-col :span="6">Price</a-col>
        <a-col :span="18">
          <a-input v-model="edited.price" />
        </a-col>
      </a-row>
    </a-modal>
    <a-modal
      title="Add a book"
      :visible="addModalVisible"
      cancelText="Close"
      okText="Add"
      @cancel="addModalVisible = false"
      @ok="onConfirmAdd"
    >
      <a-space direction="vertical" :size="8" :style="{ width: '100%' }">
        <a-row type="flex" align="middle" :style="{ marginBottom: '10px' }">
          <a-col :span="4">Title</a-col>
          <a-col :span="20">
            <a-input v-model="addBookForm.title" />
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" :style="{ marginBottom: '10px' }">
          <a-col :span="4">Description</a-col>
          <a-col :span="20">
            <a-input v-model="addBookForm.description" />
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" :style="{ marginBottom: '10px' }">
          <a-col :span="4">Author</a-col>
          <a-col :span="20">
            <a-input v-model="addBookForm.author" />
          </a-col>
        </a-row>
        <a-row type="flex" align="middle" :style="{ marginBottom: '10px' }">
          <a-col :span="4">Price</a-col>
          <a-col :span="20">
            <a-input v-model="addBookForm.price" />
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
          title: "Id",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "Author",
          dataIndex: "author",
          key: "author",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Operations",
          key: "operations",
          scopedSlots: { customRender: "operations" },
        },
      ],
      users: [],
      showAll: false,
      edited: null,
      addModalVisible: false,
      addBookForm: {
        title: "",
        description: "",
        author: "",
        price: "",
      },
      editDialogVisible: false,
    };
  },
  methods: {
    async fetchUsers() {
      console.log("fetching");
      const { data } = await findAllUsers();
      const userData = data.data.map((user) => {
        return {
          key: user.id,
          id: user.id,
          title: user.title,
          description: user.description,
          author: user.author,
          price: user.price,
        };
      });
      this.users = userData;
    },
    showAllUsers() {
      this.showAll = true;
      this.fetchUsers();
    },
    async onConfirmAdd() {
      await saveUser({ id: "123456789", ...this.addBookForm });
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
        id: this.edited.id,
        title: this.edited.title,
        description: this.edited.description,
        author: this.edited.author,
        price: this.edited.price,
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
