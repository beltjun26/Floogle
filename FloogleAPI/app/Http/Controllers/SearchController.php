<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Elasticsearch\ClientBuilder;


class SearchController extends Controller
{
    public function search(Request $request){
        $keyword = $request->input('search');
        $response = $this->searchElasticsearch($keyword);
        $result = array_map(
            function($result){
                $data = $result['_source'];
                $data['type'] = $result['_index'];
                return $data;
            },
            $response['hits']['hits']
        );
        return response()->json([
            'status' => 'success',
            'result' => $result
        ]);
    }

    public function rawSearch(Request $request){
        return $this->searchElasticsearch($request->input('search'));
    }



    private function searchElasticsearch($keyword){
        $host = config('elasticsearch.host');
        $port = config('elasticsearch.port');

        $hosts =[
            "{$host}:{$port}",
        ];
        $client = ClientBuilder::create()
            ->setHosts($hosts)
            ->build();
        $dashboardBoost = 1.0;
        if(strpos($keyword, 'dashboard') !== false){
            $dashboardBoost = 5.0;
        }
        $params = [
            'body' => [
                'indices_boost' => [
                    // 'fl-dashboard' => $dashboardBoost,
                //     'website' => 10,
                ],
                'query' => [
                    'multi_match' => [
                        'query' => $keyword,
                        'type' => 'most_fields',
                        'fields' => [ 'title', 'content' ]
                    ],
                ]
            ]
        ];
        
        return $client->search($params);
    }
}

