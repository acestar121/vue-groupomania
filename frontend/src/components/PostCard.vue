<template>
  <div id="card_post">
    <PostModify
      :revele="revele"
      :toggle-modale="toggleModale"
      :modify-post="post"
    />
    <article>
      <!--informations from the author of the post-->
      <router-link :to="`/profil/${post.User.id}`">
        <div id="post_author">
          <div id="author_img">
            <img
              v-if="!post.User.imageUrl"
              :src="require('../assets/avatar.png')"
              alt="avatar"
              class="author_avatar"
            >
            <img
              v-else
              class="author_avatar"
              alt="avatar"
              :src="`http://localhost:3000/images/${post.User.imageUrl}`"
              crossorigin="anonymous"
            >
          </div>
          <div class="author_name">
            <h4>{{ post.User.pseudo }}</h4>
          </div>
        </div>
      </router-link>
      <!--content from the writing post -->
      <div class="post_content">
        <div class="post_description">
          <div class="post_text">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
          </div>
          <img
            v-if="post.imageUrl"
            :src="`http://localhost:3000/images/${post.imageUrl}`"
            crossorigin="anonymous"
            class="post_img"
          >
        </div>            
        
        <!--add the datetime -->
        <div class="post_date">
          <p>publié le {{ datePost(post.createdAt) }}</p>
          <p v-if="post.updatedAt !== post.createdAt">
            modifié le {{ datePost(post.updatedAt) }}
          </p>
        </div>
      </div>
    <!--content from the writing post -->
         
    <div class="separate_barre" />

    <!-- add like to the post-->
    <PostLike 
      :post="post"
    />

    <!--add a comment to the post -->
    <CommentCard     
      :post="post"
    />  
  
    </article>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import PostModify from "./PostModify.vue";
import PostLike from "./PostLike.vue";
import CommentCard from "./CommentCard.vue";

export default {
  name: "PostCard",
  components: {
    PostModify,
    PostLike,
    CommentCard,
  },
  props: ["post", "comment", "user"],
  emit: ["input"],
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      revele: false,
      like: ref(0),
      dislike: ref(0),
      postId: this.post.id,
    };
  },
  computed: mapGetters(["posts"]),

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

    //modify a post
    toggleModale(postId) {
      this.revele = !this.revele;
      console.log("PostCard||toggleModale||postId", postId);
    },

    //delete a post
    ...mapActions(["deletePost"]),
  },
};
</script>

<style lang="scss">
#card_post {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 95%;
  background-color: white;
  border-radius: 20px;
  border: 2px solid #fd2d01;
  box-shadow: 5px 5px 10px #4e5166;
  padding: 10px 10px 0px 10px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  @media (min-width: 768px) and (max-width: 992px) {
    width: 90%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
}
#post_author {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
  &:hover {
    background-color: #ffd7d7;
    color: #fd2d01;
  }
}

.author_avatar {
  width: 50px;
  margin: 10px;
  border-radius: 50%;
}
h4 {
  margin: 25px;
}

#card_post h3,
#card_post p {
  margin: 0;
  padding-bottom: 5px;
  padding-left: 10px;
}

#card_post p {
  text-align: justify;
  margin-right: 5px;
}
.post_content {
  display: flex;
  flex-direction: column;
}
.post_description {
  display: flex;
  flex-direction: row;
}
.post_text {  
  width: 80%;
}
.post_date {
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 5px;
}

.fa-comments,
.fa-feather-alt {
  font-size: 40px;
  margin: 2px;
  background: linear-gradient(
      217deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 70.71%
    ),
    linear-gradient(127deg, rgba(209, 166, 14, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(236, 147, 14, 0.8), rgba(0, 0, 255, 0) 70.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>