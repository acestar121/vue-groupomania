<template>
  <form id="profil_form">
    <h2>Profil de {{ user.pseudo }}</h2>

    <!--user profile image -->
    <div id="photo_icone">
      <img
        v-if="!user.imageUrl"
        :src="require('../assets/avatar.png')"
        alt="avatar"
        class="profil_image"
      >
      <img
        v-else
        class="profil_image"
        alt="avatar"
        title="mon avatar"
        :src="`http://localhost:3000/images/${user.imageUrl}`"
        crossorigin="anonymous"
      >
      <div v-if="userValue == userId">
        <router-link :to="`/profil/${userId}/edit`">
          <i class="fas fa-pencil-alt" />
        </router-link>
      </div>
    </div>

    <!--user information -->
    <div id="name_card">
      <div>{{ user.firstname }} {{ user.lastname }}</div>
      <div>{{ user.email }}</div>
    </div>

    <div id="separation_barre" />

    <h2>
      {{ posts.length }} Message{{ posts.length > 1 ? "s" : "" }} publié{{
        posts.length > 1 ? "s" : ""
      }}
    </h2>
    <div
      v-for="post in posts"
      id="card"
      :key="post.id"
      :posts="posts"
    >
      <h3>{{ post.title }}</h3>
      <p class="user_post_content">
        {{ post.content }}
      </p>
      <img
        v-if="post.imageUrl"
        :src="`http://localhost:3000/images/${post.imageUrl}`"
        crossorigin="anonymous"
      >
      <!--add the datetime -->
      <div class="post_date">
        <p>publié le {{ datePost(post.createdAt) }}</p>
        <br>
        <p v-if="post.updatedAt !== post.createdAt">
          - modifié le {{ datePost(post.updatedAt) }}
        </p>
      </div>
    </div>
  </form>
  <!-- Bouton Scroll to Top-->
  <button
    class="toTop"
    title="Retour en haut de page"
    @click="toTop"
  >
    <span class="fa fa-chevron-up" />
  </button>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ProfilUser",
  data() {
    return {
      token: localStorage.getItem("token"),
      userValue: localStorage.getItem("userId"),
      userId: this.$route.params.id,
      user: ref({
        pseudo: "",
        firstname: "",
        lastname: "",
        email: "",
        imageUrl: "",
      }),
      posts: ref({
        title: "",
        content: "",
        imageUrl: "",
      }),
    };
  },

  beforeCreate() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token == null && userId == null) {
      this.$router.push({ name: "LogIn" });
    }
  },

  //get all the informations about the user
  async created() {
    await fetch(`http://localhost:3000/api/users/profil/${this.userId}`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.redirect) {
          this.$router.push({ name: "LogIn" });
        }
        console.log("ProfilUser||data", data);
        this.user = data;
      })
      .catch((err) => console.log(err));
  },

  //get all posts from the user
  async mounted() {
    await fetch(`http://localhost:3000/api/posts/user/${this.userId}`, {
      methods: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ProfilUser||posts||data", data);
        this.posts = data;
      })
      .catch((err) => console.log(err));
  },

  methods: {
    //date of the post
    datePost(date) {
      const event = new Date(date);
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },
    //date of the comment
    dateComment(date) {
      const event = new Date(date);
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },

    //button scroll top
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss">
#profil_form {
  width: 50%;
  color: black;
  border: 1px solid #fd2d01;
  border-radius: 30px;
  margin: auto;
  margin-bottom: 25px;
  position: relative;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 80%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}

.profil_image {
  text-align: center;
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 10px;
}
#file-input {
  display: none;
}
.fa-pencil-alt {
  background: #f5f5f5;
  color: black;
  width: 35px;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  right: 30%;
  top: 290px;
  &:hover {
    color: red;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    top: 39%;
    right: 34%;
  }
  @media screen and (max-width: 768px) {
    top: 37%;
    right: 33%;

  }
}
.fa-pencil-alt:hover {
  background: #ffd7d7;
}
#name_card {
  font-size: 22px;
  line-height: 35px;
  margin-bottom: 20px;
  text-align: center;
}
#separation_barre {
  border: 1px solid #455166;
  width: 30%;
  margin: auto;
  margin-bottom: 20px;
}

.user_post_content {
  text-align: justify;
  padding: 10px;
}
</style>