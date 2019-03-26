package com.softcraftng.murpheux.qtaskr.provider;

import com.dezlum.codelabs.getjson.GetJson;
import com.google.gson.JsonObject;

import java.util.concurrent.ExecutionException;

public class provider {

    private final String base_url = "http://localhost:8000/api";
    private GetJson gjson;

    public void provider() {
        gjson = new GetJson();


    }

    void save_new_task() {
        String url = base_url + "/newtask";

        try {
            JsonObject jsonObject = gjson.AsJSONObject(url);


        } catch (ExecutionException e) {
            e.printStackTrace();

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    void get_my_task() {

    }
}
