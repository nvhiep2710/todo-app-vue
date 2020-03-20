<template>
  <div class="container">
    <h1 class="container__title">Todos</h1>
    <div class="container__search" id="search">
      <input type="text" v-model="textSearch" @input="submitSearch" />
      <div class="image">
        <img src="../../assets/search.svg" alt />
      </div>
    </div>
    <div class="container__content">
      <div class="container__content--header">
        <img src="../../assets/down-arrow.svg" class="arrowSelect" @click="selectAll" alt />
        <input
          type="text"
          placeholder="Add todo"
          class="input"
          @keyup.enter="handleAddTodo"
          :value="inputValue"
        />
      </div>
      <div class="container__content--todo" v-for="item in todoList" :key="item.id">
        <img
          v-if="item.status"
          src="../../assets/check.svg"
          @click="handleClick(item._id, !item.status)"
          alt
        />
        <img v-else src="../../assets/right.svg" @click="handleClick(item._id, !item.status)" alt />
        <span v-if="!item.status">{{item.title}}</span>
        <strike :class="{ active: item.status }" v-else>{{item.title}}</strike>
        <div class="close" @click="handleDelete(item._id)">
          <img src="../../assets/close.svg" alt />
        </div>
      </div>
      <div class="container__content--filter">
        <span class="title">{{total}} items</span>
        <ul>
          <li
            v-for="item in option"
            :key="item.id"
            :class="{ active: item.id === isFilter }"
            @click="handleFilter(item.status)"
          >{{ item.name }}</li>
        </ul>
        <span v-if="handleCheck" class="clear" @click="handleClearComplete">Clear Complete</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isCompleted: false,
      inputValue: null,
      isSelect: false,
      isFilter: null,
      textSearch: "",
      option: [
        {
          id: 0,
          name: "All"
        },
        {
          id: 2,
          name: "Active",
          status: false
        },
        {
          id: 1,
          name: "Complete",
          status: true
        }
      ]
    };
  },
  computed: {
    ...mapState("todo", ["todoList", "total"]),
    handleCheck() {
      return this.todoList.some(itm => itm.status === true);
    }
  },
  mounted() {
    this.fetchTodoList(this.isFilter);
  },
  methods: {
    ...mapActions("todo", [
      "fetchTodoList",
      "addTodo",
      "deleteTodo",
      "updateTodo",
      "changeStatusAll",
      "deleteComplete",
      "fetchTodoListSearch"
    ]),
    submitSearch(e) {
      this.fetchTodoListSearch(e.target.value);
    },
    async handleLogout() {
      await this.logout();
    },
    handleClearComplete() {
      this.deleteComplete(this.isFilter);
    },
    handleAddTodo(e) {
      if (e.target.value.length > 0) {
        this.addTodo(e.target.value);
        this.$notify({
          type: "success",
          title: "Todo Notification",
          text: "Add todo task success"
        });
      }
    },
    handleClick(id, status) {
      this.$notify({
        title: "Todo Notification",
        text: "Update todo task success"
      });
      this.updateTodo({ id: id, status: status, filter: this.isFilter });
    },
    handleFilter(status) {
      this.isFilter = status;
      this.fetchTodoList(status);
    },
    handleDelete(id) {
      this.deleteTodo({ id: id, filter: this.isFilter });
      this.$notify({
        type: "success",
        title: "Todo Notification",
        text: "Delete todo task success"
      });
    },
    selectAll() {
      this.isSelect = !this.isSelect;
      this.changeStatusAll({ status: this.isSelect, filter: this.isFilter });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 550px;
  box-shadow: coral;
  color: #4d4d4d;
  flex-direction: column;
  justify-content: start;
  margin: 0 auto;
  &__search {
    width: 550px;
    height: 50px;
    display: flex;
    background-color: #fff;
    position: relative;
    margin-bottom: 11px;
    .image {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      position: absolute;
      top: 12px;
      right: 15px;
    }
    input {
      width: 92%;
      padding: 10px;
      font-size: 30px;
      font-weight: 300;
      border: none;
      outline: none;
    }
  }
  &__title {
    text-align: center;
    color: #ead7d7;
    background-color: transparent;
    font-size: 70px;
    font-weight: 300;
    letter-spacing: 1.7px;
    padding-bottom: 55px;
  }
  &__content {
    width: auto;
    margin-bottom: 30px;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.5);
    background: #fff;
    &--header {
      display: flex;
      align-items: center;
      .arrowSelect {
        width: 40px;
        height: 20px;
        padding-left: 20px;
      }
      .input {
        height: auto;
        border: none;
        outline: none;
        width: 84%;
        font-size: 30px;
        font-weight: 300;
        border: 1px solid red;
        padding: 16px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
      }
    }
    &--todo {
      display: flex;
      align-items: center;
      height: auto;
      padding: 15px;
      position: relative;
      border-top: 1px solid #000;
      transition: 0.3s ease-in-out;
      img {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      strike,
      span {
        word-break: break-word;
        padding-left: 15px;
        font-size: 30px;
      }
      .active {
        opacity: 0.7;
      }
      .close {
        position: absolute;
        top: 27px;
        right: 27px;
        img {
          width: 20px;
          height: 20px;
          opacity: 0;
        }
      }
      &:hover > .close img {
        opacity: 1;
        transition: 0.3s ease-in-out;
      }
    }
    &--filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px;
      ul {
        .active {
          transition: 0.3 ease-in-out;
          border: 1px solid rgba(175, 47, 47, 0.2);
          border-radius: 8px;
        }
        li {
          list-style: none;
          display: inline;
          margin-right: 10px;
          padding: 8px 15px;
          cursor: pointer;
          a {
            color: #4d4d4d;
            text-decoration: none;
          }
          &:hover {
            transition: 0.3 ease-in-out;
            border: 1px solid rgba(175, 47, 47, 0.2);
            border-radius: 8px;
          }
        }
      }
      .clear {
        margin-right: 10px;
        padding: 8px 15px;
        cursor: pointer;
        &:hover {
          transition: 0.3 ease-in-out;
          border: 1px solid rgba(175, 47, 47, 0.2);
          border-radius: 8px;
        }
      }
    }
  }
}
</style>