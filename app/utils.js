const getRequestData = async (req) => {

  return new Promise((resolve, reject) => {
    try {

      let body = "";

      req.on("data", (part) => {
        body += part.toString();

      });

      req.on("end", () => {
        const jsonData = JSON.parse(body);
        resolve(jsonData);
      });

    } catch (error) {
      reject(error);
    }
  })

}
export default getRequestData