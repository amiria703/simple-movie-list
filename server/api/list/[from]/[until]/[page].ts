export default defineEventHandler(async (event) => {
  return await $fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&release_date.gte=${event.context.params.from}&release_date.lte=${event.context.params.until}&page=${event.context.params.page}`);
})
