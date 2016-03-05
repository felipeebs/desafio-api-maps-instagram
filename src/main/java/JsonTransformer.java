import com.google.gson.Gson;
import spark.ResponseTransformer;

/**
 * Helper para retornar em formato JSON pelo Spark
 * @author Felipe.S
 */
public class JsonTransformer implements ResponseTransformer {

    private Gson gson = new Gson();

    @Override
    public String render(Object model) {
        return gson.toJson(model);
    }
    
    
}
