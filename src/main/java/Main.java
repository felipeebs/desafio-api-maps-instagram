import com.heroku.sdk.jdbc.DatabaseUrl;
import java.util.HashMap;
import java.util.Map;
import static spark.Spark.*;
import spark.template.freemarker.FreeMarkerEngine;
import spark.ModelAndView;
import spark.Session;
import static spark.Spark.get;

/**
 * Classe principal para lidar cm requisicoes do Spark
 * @author Felipe.S
 */
public class Main {

    private String clientId = "7c37aa0576f344fda37cc3330d424e1f";
    private String clientSecret = "d4c0a274bb5b4572a41733a2c1484a1d";
    private String redirect_uri = "http://localhost:5000/codeCallback";
    
    public static void main(String[] args) {

        port(Integer.valueOf(System.getenv("PORT")));
        staticFileLocation("/public");

        get("/secret", (req, res) -> {
            return "<h1>You have found the secret level!</h1><br /><p>But there's nothing here...</p>";
        });

        get("/", (req, res) -> {
            Map<String, Object> attributes = new HashMap<>();
            return new ModelAndView(attributes, "index.ftl");
        }, new FreeMarkerEngine());

        get("/user/:userId/favorites", "application/json", (req, res) -> {
            long id = Long.valueOf(req.params(":userId"));
            try {
                return Favorite.getAllByUser(id);
            } catch (Exception e) {
                e.printStackTrace(System.err);
            }
            return null;
        }, new JsonTransformer());
    }

}
