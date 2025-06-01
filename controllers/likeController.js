exports.getLike = async (req, res) => {
    try {
      // Foydalanuvchi ID va rasm ID sini so‘rov body dan olamiz
      const { userId, photoId } = req.body;
  
      // Ma'lumotlar bazasida foydalanuvchi bu rasimni yoqtirgan-yoqtirmaganini tekshiramiz
      const isLiked = await pool.query(
        "SELECT * FROM likes WHERE userID = $1 and photoId = $2",
        [userId, photoId]
      );
  
      // Agar foydalanuvchi allaqachon yoqtirgan bo‘lsa, like ni olib tashlaymiz
      if (isLiked.rows.length > 0) {
        await pool.query("DELETE FROM likes WHERE userId = $1 and photoId = $2", [
          userId,
          photoId,
        ]);
  
        // Javob qaytaramiz: like olib tashlandi
        return res
          .status(200)
          .json({ message: "Like o‘chirildi", isLiked: false });
      }
  
      // Agar foydalanuvchi hali yoqtirmagan bo‘lsa, like qo‘shamiz
      await pool.query("INSERT INTO likes VALUES ($1, $2) RETURNING *", [
        userId,
        photoId,
      ]);
      res.status(201).json({ message: "Like qilindi", isLiked: true });
    } catch (error) {
      console.log(error.message);
  
      // Server xatosi yuz berganligini bildiruvchi javob qaytaramiz
      res.status(500).send("Girgittonimizda nomaqbul nuqson yuzaga keldi");
    }
  }