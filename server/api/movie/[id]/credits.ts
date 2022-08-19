export default defineEventHandler(async (event) => {
    return await $fetch(`https://api.themoviedb.org/3/movie/${event.context.params.id}/credits?api_key=${process.env.API_KEY}&language=en-US`);
})
