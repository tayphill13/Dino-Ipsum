export class GiphService {
  async getGiphy() {
    try {
      let response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&rating=g&tag=dinosaur`);
      let jsonResponse;
      if (response.ok && response.status == 200) {
        jsonResponse = await response.json();
      } else {
        jsonResponse = false;
      }
      return jsonResponse;
    } catch (error) {
      return false;
    }
  }
}