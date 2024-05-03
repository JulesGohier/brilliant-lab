<?php
$result = array();
$path_project = 'projects/';
$folder = scandir($path_project);

foreach ($folder as $project) {
    if ($project != '.' && $project != '..' && $project[0] != '.') {
        $project_path = $path_project . '/' . $project . '/' . 'data.json';

        $data_json = file_get_contents($project_path);
        $result[] = json_decode($data_json);
    }
}

$json_result = json_encode($result);
echo $json_result;
