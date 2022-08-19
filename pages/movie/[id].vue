<script setup>
const router = useRouter();
const movie = await $fetch(`/api/movie/${router.options.history.location.split('/')[2]}`);
const crew = ref([]);
async function crewData() {
    const credits = await $fetch(`/api/movie/${router.options.history.location.split('/')[2]}/credits`);
    crew.value = credits.cast.sort(function(a, b) {
        return b.popularity - a.popularity;
    });
}
await crewData();
</script>
<template>
    <div class="root" v-if="movie">
        <div>
            <div class="header-box">
                <span>
                    <button @click="navigateTo('/')">
                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13 5.33331L2.60929 5.33331L6.18529 1.75731C6.44562 1.49698 6.44562 1.07481 6.18546 0.814648C5.92512 0.554315 5.50279 0.554315 5.24246 0.814648L0.528624 5.52865C0.497623 5.55965 0.469958 5.59381 0.445625 5.63015C0.434459 5.64698 0.426624 5.66515 0.416958 5.68265C0.405957 5.70331 0.393291 5.72298 0.384458 5.74481C0.374958 5.76731 0.369625 5.79065 0.362958 5.81398C0.357458 5.83248 0.350291 5.85015 0.346458 5.86915C0.337791 5.91248 0.333291 5.95615 0.333291 5.99998C0.333291 6.00048 0.333458 6.00098 0.333458 6.00148C0.333624 6.04465 0.337958 6.08798 0.346458 6.13048C0.350458 6.15048 0.357958 6.16898 0.363791 6.18865C0.370291 6.21081 0.375291 6.23331 0.384291 6.25481C0.393958 6.27798 0.406958 6.29898 0.418958 6.32081C0.427958 6.33715 0.435123 6.35381 0.445457 6.36948C0.46979 6.40631 0.497791 6.44065 0.528958 6.47181L5.24263 11.1853C5.50296 11.4456 5.92512 11.4456 6.18546 11.1855C6.44579 10.9251 6.44579 10.503 6.18546 10.2425L2.60946 6.66665L13 6.66665C13.3681 6.66665 13.6666 6.36815 13.6666 5.99998C13.6666 5.63181 13.3681 5.33331 13 5.33331Z"
                                fill="white" />
                        </svg> Back</button>
                </span>
                <span class="header-box-name">
                    <p class="header-box-name-title">{{ movie.title }}</p>
                    <p>{{ movie.tagline }}</p>
                </span>
            </div>
            <div class="info-box">
                <img :src="'https://image.tmdb.org/t/p/w400' + movie.poster_path" alt="" loading="lazy">
                <div>
                    <div>
                        <span class="info-box-bold">Budget</span><span>{{ Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD',maximumFractionDigits: 0}).format(movie.budget) }}</span>
                    </div>
                    <div>
                        <span class="info-box-bold">Revenue</span><span>{{ Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD',maximumFractionDigits: 0}).format(movie.revenue) }}</span>
                    </div>
                    <div>
                        <span class="info-box-bold">Release Date</span><span>{{ movie.release_date }}</span>
                    </div>
                    <div>
                        <span class="info-box-bold">Runtime</span><span>{{ movie.runtime }}</span>
                    </div>
                    <div>
                        <span class="info-box-bold">Score</span><span>{{ `${movie.vote_average} (${movie.vote_count}
                        votes)`}}</span>
                    </div>
                    <div>
                        <span class="info-box-bold">Genres</span><span>
                            <span v-for="(genre, index) in movie.genres">{{ index + 1 != movie.genres.length ?
                                genre.name + " • " : genre.name
                            }}</span>
                        </span>
                    </div>
                    <div>
                        <span class="info-box-bold">IMDB Link</span><span>
                            <NuxtLink :to="`https://www.imdb.com/title/${movie.imdb_id}`" target="_blank">Link</NuxtLink>
                        </span>
                    </div>
                    <div>
                        <span class="info-box-bold">Homepage Link</span><span>
                            <NuxtLink :to="movie.homepage" target="_blank">Link</NuxtLink>
                        </span>
                    </div>
                </div>
            </div>
            <div class="details-box">
                {{ movie.overview }}
            </div>
            <div class="crew-box">
                <div class="crew-box-title">Credit:</div>
                <div class="crew-box-list">
                    <span v-for="(cast, index) in crew">
                        <span v-if="index < 10">{{ (index+1 != crew.length) && !(index == 9) ? cast.name+', ' : cast.name+ (crew.length > 10 ? ` and ${crew.length-10} more.` : '.') }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.root {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.root>div {
    width: 1024px;
}

.header-box {
    background: #E2E2E2;
    border-radius: 6px;
    width: 1024px;
    height: 85px;
    display: flex;
    align-items: center;
    padding: 0 35px;
    margin-top: 117px;
    box-sizing: border-box;
}

.header-box span {
    display: flex;
}

.header-box span p {
    height: 19px;
    margin-left: 64px;
}

.header-box span div {
    width: 221px;
    height: 33px;
    margin-left: 29px;
    border: none;
}

.header-box span button {
    width: 92px;
    height: 33px;
    background: #549DF2;
    border-radius: 100px;
    border: none;
    color: white;
}

.header-box span button:hover {
    cursor: pointer;
}

.header-box svg {
    margin-right: 6.33px;
}

.header-box-name {
    flex-direction: column;
}

.header-box-name-title {
    font-weight: 700;
    margin-bottom: 6px;
}

.info-box {
    margin-top: 78px;
    display: flex;
}

.info-box>div {
    display: flex;
    flex-direction: column;
    margin-left: 70px;
    margin-top: 25px;
    width: 606px;
    row-gap: 18px;
}

.info-box>div>div {
    display: flex;
    justify-content: space-between;
}

.info-box img {
    width: 330px;
    height: 495px;
    border-radius: 12px;
}

.info-box .info-box-bold {
    font-weight: 700;
}

.info-box a {
    color: #318FE7;
}

.details-box {
    margin-top: 53px;
}

.crew-box {
    margin-top: 80px;
}

.crew-box .crew-box-title {
    font-weight: 700;
    margin-bottom: 12px;
}
</style>
