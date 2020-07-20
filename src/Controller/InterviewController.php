<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class InterviewController extends AbstractController
{
    /**
     * @Route("/interview", name="interview")
     */
    public function index()
    {
        return $this->render('interview/index.html.twig', [
            'controller_name' => 'InterviewController',
        ]);
    }
}
