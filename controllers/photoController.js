const pool = 

exports.getPhoto = async (req, res) => {
    try {
      const { url, userId } = req.body;
      const result = await pool.query(
        "INSERT INTO photos (url, userId) VALUES ($1, $2) RETURNING *",
        [url, userId]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
    }
  }

exports.myPhoto = async (req, res) => {
    try {
      const { userId } = req.query;
      if (userId) {
        const resultUser = await pool.query(
          "SELECT * FROM photos WHERE userId = $1",
          [userId]
        );
        return res.status(200).json(resultUser.rows);
      }
  
      const result = await pool.query("SELECT * FROM photos");
      res.status(200).json(result.rows);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
    }
  }

exports.deletePhoto = async (req, res) 