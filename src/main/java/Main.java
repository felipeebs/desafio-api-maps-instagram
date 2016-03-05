import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;
import static spark.Spark.*;
import spark.template.freemarker.FreeMarkerEngine;
import spark.ModelAndView;
import static spark.Spark.get;

/**
 * Classe principal para lidar com requisicoes do Spark
 * @author Felipe.S
 */
public class Main {

    public static void main(String[] args) {

        port(Integer.valueOf(System.getenv("PORT")));
        staticFileLocation("/public");
        Gson gson = new Gson();

        get("/secret", (req, res) -> {
            return "<h1>You have found the secret level!</h1><br /><p>But there's nothing here...</p>";
        });

        get("/", (req, res) -> {
            Map<String, Object> attributes = new HashMap<>();
            return new ModelAndView(attributes, "index.ftl");
        }, new FreeMarkerEngine());

        post("/user/auth", (req, res) -> {
            User user = User.auth(req.params("login"), req.params("pass"));
            return user;
        }, new JsonTransformer());

        get("/user/:userId/favorites", (req, res) -> {
            long id = Long.valueOf(req.params(":userId"));
            try {
                return User.getFavorites(id);
            } catch (Exception e) {
                e.printStackTrace(System.err);
            }
            return null;
        }, new JsonTransformer());

        get("/favorite/single", (req, res) -> {
            long userId = Long.valueOf(req.params("userId"));
            String mediaId = req.params("mediaId");
            return Favorite.get(userId, mediaId);
        }, new JsonTransformer());

        post("/favorite/add", "application/json", (req, res) -> {
            Favorite obj = gson.fromJson(req.body(), Favorite.class);
            return Favorite.save(obj);
        }, new JsonTransformer());

        put("/favorite/edit", "application/json", (req, res) -> {
            Favorite obj = gson.fromJson(req.body(), Favorite.class);
            return Favorite.update(obj);
        }, new JsonTransformer());

        delete("/favorite/delete", "application/json", (req, res) -> {
            Favorite obj = gson.fromJson(req.body(), Favorite.class);
            return Favorite.delete(obj.getUserId(), obj.getMediaId());
        }, new JsonTransformer());
    }

}
