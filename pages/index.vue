<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref([new Date('2021-09-01'), new Date('2022-09-01')]);
function format([date,date2]) {
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate())).slice(-2)} - ${date2.getFullYear()}-${("0" + (date2.getMonth() + 1)).slice(-2)}-${("0" + (date2.getDate())).slice(-2)}`;
}

const page = ref(1);
const movies = ref();
async function update(){
    movies.value = await $fetch(`/api/list/${date.value[0].getFullYear()}-${("0" + (date.value[0].getMonth() + 1)).slice(-2)}-${("0" + (date.value[0].getDate())).slice(-2)}/${date.value[1].getFullYear()}-${("0" + (date.value[0].getMonth() + 1)).slice(-2)}-${("0" + (date.value[1].getDate())).slice(-2)}/${page.value}`);
}
update();
async function pageIncrease() {
    page.value++;
    await update();
}
async function pageDecrease() {
    page.value--;
    await update();
}
async function searchDate() {
    page.value = 1;
    await update();
}

const genres = ref([]);
async function fetchGenres(){
    const genresTemp = await $fetch('/api/genres');
    for (let genre of genresTemp.genres) {
        genres.value[genre.id] = genre.name;
    }
}
fetchGenres();
</script>
<template>
    <div class="root" v-if="movies">
        <div class="search-box">
            <span>
                <p>Search by release date:</p>
                <Datepicker v-model="date" range :format="format"/>
            </span>
            <span>
                <button @click="searchDate">Search</button>
            </span>
        </div>
        <div class="movie-card-container">
            <div class="movie-card" v-for="movie in movies.results" @click="navigateTo(`/movie/${movie.id}`)">
                <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" alt="" loading="lazy">
                <span>
                    <p class="movie-card-title">{{ movie.title }}</p>
                    <span class="movie-card-inner-span">
                        <img src="../assets/calendar-icon.png" alt="">
                        <p>{{ movie.release_date }}</p>
                    </span>
                    <span class="movie-card-genre">
                        <span v-for="(genre,index) in movie.genre_ids">{{ index+1 != movie.genre_ids.length ? genres[genre]+" • " : genres[genre] }}</span>
                    </span>
                </span>
            </div>
        </div>
        <div class="pagination">
            <div class="pages-control">
                <p :class="page > 1 ? 'enabled-pagination' : 'disabled-pagination'" style="text-align:right;"
                    @click="page > 1 ? pageDecrease() : true">Previous Page</p>
                <div class="line"></div>
                <p :class="page < movies.total_pages ? 'enabled-pagination' : 'disabled-pagination'"
                    @click="page < movies.total_pages ? pageIncrease() : true">Next Page</p>
            </div>
            <p class="show-results-number">{{ `Showing results ${movies.total_pages == 0 ? "0" : (page * 20) - 19}-${((page * 20) - 20) +
                    movies.results.length}`
            }}
            </p>
        </div>
    </div>
</template>
<style scoped>
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-box {
    background: #E2E2E2;
    border-radius: 6px;
    width: 1024px;
    height: 85px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 62px;
    margin-top: 117px;
    box-sizing: border-box;
}

.search-box span {
    display: flex;
    align-items: center;
}

.search-box span p {
    width: 165px;
    height: 19px;
    margin-left: 19px;
}

.search-box span div {
    width: 221px;
    height: 33px;
    margin-left: 29px;
    border: none;
}

.search-box span button {
    width: 74px;
    height: 33px;
    background: #549DF2;
    border-radius: 100px;
    border: none;
    color: white;
}

.search-box span button:hover {
    cursor: pointer;
}

.movie-card-container {
    margin-top: 119px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 67px;
    row-gap: 35px;
}

.movie-card {
    width: 295px;
    height: 195px;
    background: #F1F1F1;
    border: 1px solid #C4C4C4;
    border-radius: 6px;
    display: flex;
    flex-basis: 25%;
    box-sizing: border-box;
    padding-right: 5px;
}

.movie-card:hover {
    cursor: pointer;
}

.movie-card>img {
    width: 128px;
    height: 188px;
    border-radius: 6px 0px 0px 6px;
    margin: 3px 0px 4px 4px;
}

.movie-card p.movie-card-title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    margin-left: 11px;
    margin-top: 16px;
}

.movie-card>span {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    width: inherit;
    overflow: hidden;
}

.movie-card .movie-card-inner-span {
    display: flex;
    flex-direction: row;
    align-items: center;
    top: 123px;
    left: 11px;
    position: absolute;
}

.movie-card .movie-card-genre {
    position: absolute;
    top: 153px;
    font-size: 13px;
    left: 11px;
}

.movie-card>span>span>p {
    margin-left: 7px;
    font-size: 13px;
    color: #4E4E4E;
}

.pagination {
    margin-top: 161px;
    margin-bottom: 50px;
    width: 300px;
    height: 73px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pages-control {
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination .line {
    width: 40px;
    height: 0px;
    border: 1px solid #6A6A6A;
    transform: rotate(90deg);
}

.pagination .disabled-pagination {
    font-weight: 700;
    color: rgba(0, 0, 0, 0.48);
    user-select: none;
}

.pagination .enabled-pagination {
    font-weight: 700;
    color: #318FE7;
    cursor: pointer;
    user-select: none;
}

.pagination .show-results-number {
    color: #989898;
    margin-top: 25px;
}
</style>
