<template>
    <header class="fixed-header">
      <div class="header-content">
        <img @click="$router.push({name:'home'})" class="logo" :src="hn_logo">
  
        <div class="title-container-to-right">
          <div class="title">
            <div class="title-line">Search</div>
            <div class="subtitle-line">Hacker News</div>
          </div>
        </div>
  
        <div class="search-container">
          <img class="search-icon" :src="searchIcon" >
          <input type="text" class="search-input" placeholder="Search stories by title, url or author">
        </div>
      </div>
  
        <img class="algolia-logo" :src="algolia_logo" >
    </header>
  </template>
  
  
  <script setup lang="ts">
  import searchIcon from '../svgs/search.svg'
  import hn_logo from '../assets/hn_logo.png'
  import algolia_logo from '../svgs/algolia_logo.svg'
  </script>
  
  <style scoped>
  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #F0EBE3;
    z-index: 1000;
    padding: 0.5rem 1rem;
    height: 6rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  
  .header-content {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .logo {
    width: 5rem; 
    height: auto;
    margin-right: 1rem; 
    border-radius: 10px;
    cursor: pointer;
  }
  
  .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 0.75rem; 
    color: gray;
    font-size: 1rem; 
  }
  
  .title-line {
    font-weight: bold;
    font-size: 2rem;
  }
  
  .subtitle-line {
    font-size: 1.5rem;
  }
  
  .search-container {
    position: relative;
    width: 70%;
    display: inline-block;
    margin:  auto;
    margin-left: 5rem;
  }
  
  .search-input {
    padding: 0.5rem 1rem;
    padding-left: 2.5rem;
    border: none;
    border-radius: 20px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    height: 3rem;
  }
  
  .search-icon {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    fill: #888;
  }

  
.algolia-logo {
  width: 15rem; 
  height: auto;
  margin-right: 1rem;
}
  
  

  </style>
  