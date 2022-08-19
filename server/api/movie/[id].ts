export default defineEventHandler(async (event) => {
  return await $fetch(`https://api.themoviedb.org/3/movie/${event.context.params.id}?api_key=${process.env.API_KEY}&language=en-US`);
})
