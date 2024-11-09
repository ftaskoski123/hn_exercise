<template>
    <aside class="sidebar">
      <nav>
        <ul class="nav-list">
          <li @click="$router.push({name:'all'})" :class="{'nav-item-active':$route.name==='all'}" class="nav-item">
            <img class="icon" :src="newspaperIcon" >All</li>
          <li @click="$router.push({name: 'hot'})" :class="{'nav-item-active':$route.name==='hot'}" class="nav-item">
            <img class="icon" :src="hotIcon" >
            Hot</li>
          <li class="nav-item">
           <img class="icon" :src="speakerIcon" >
            Show HN</li>
          <li class="nav-item">
            <img class="icon" :src="commentIcon" >
            Ask HN</li>
          <li class="nav-item">
            <img class="icon" :src="bulbIcon" >
            Polls</li>
          <li class="nav-item">
            <img class="icon" :src="cashIcon" >
            Jobs</li>
          <hr class="separator">
          <li class="nav-item">
            <img class="icon" :src="personIcon" >
            Shipow</li>
          <li @click="$router.push({name:'starred'})" :class="{'nav-item-active':$route.name==='starred'}" class="nav-item">
            <img class="icon" :src="starIcon" >
            Starred
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
<script setup lang="ts">
import starIcon from '../svgs/star.svg'
import hotIcon from '../svgs/hot.svg'
import speakerIcon from '../svgs/speaker.svg'
import commentIcon from '../svgs/comment.svg'
import bulbIcon from '../svgs/bulb.svg'
import cashIcon from '../svgs/cash.svg'
import newspaperIcon from '../svgs/newspaper.svg'
import personIcon from '../svgs/person.svg'
</script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    top: 5rem;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: #E3E0D3;
    padding-top: 1rem;
    border-right: 1px solid #ccc;
  }
  
  .nav-list {
    list-style-type: none;
    padding: 0;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    cursor: pointer;
    color: #333;
  }
  
  .nav-item:hover {
    background-color: #D1CEC4;
  }

  .nav-item-active{
    background-color: #D1CEC4;
  }
  
  .separator {
    border: none;
    border-top: 1px solid #aaa;
    margin: 0.5rem;
  }
  
  .icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    fill: #231F20;
  }
  </style>
  