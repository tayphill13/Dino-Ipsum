export class NameService {
  async getDinoName() {
    try {
      let response = await fetch("https://dinoipsum.herokuapp.com/api?format=json&words=1&paragraphs=1");
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