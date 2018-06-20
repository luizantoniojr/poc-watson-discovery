<template>
  <div class="home">
    <v-container fluid>
      <v-layout>
        <v-flex xs4 ml-5>
          <v-text-field
            id="busca"
            name="busca"
            label="Digite o que você quer buscar"
            append-icon="search"
            v-model="busca"
            v-on:keypress.enter="getHealth"
          ></v-text-field>
        <v-card>
        <v-list three-line v-show="!!resultado">
          <template v-for="(item, index) in resultado">
            <v-subheader v-if="item.header" :key="item.id">{{ item.title }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile v-else :key="item.id" avatar >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.text"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        </v-card>
    </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      busca: "",
      resultado: null
    };
  },
  methods: {
    getHealth() {
      this.$http
        .get(`http://localhost:3000/watson/${this.busca}`)
        .then(response => {
          this.resultado = response.body.results;
        });
    }
  }
};
</script>
