import java.util.HashMap;
import java.util.Map;
import static spark.Spark.*;
import spark.template.freemarker.FreeMarkerEngine;
import spark.ModelAndView;
import spark.Session;
import static spark.Spark.get;

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
            Session session = req.session(true);
            Map<String, Object> attributes = new HashMap<>();
            if (!session.isNew()) {
                attributes.put("token", session.attribute("token"));
            }
            //attributes.put("token", "token aqui");

            return new ModelAndView(attributes, "index.ftl");
        }, new FreeMarkerEngine());

        get("/user", (req, res) -> {
            return "Hello Heroku!";
        });
    }

}
