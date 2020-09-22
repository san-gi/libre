<?php

namespace App\Controller;

use App\Entity\Chapitre;
use App\Entity\Article;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BaseController extends AbstractController
{
    /**
     * @Route("/", name="base")
     */
    public function index()
    {
        $chap = $this->getDoctrine()->getRepository(Chapitre::class);
        $chapitre = $chap->findBy(array(),array('id'=>'DESC'),1,0);

        $art = $this->getDoctrine()->getRepository(Article::class);
        $article = $art->findBy(array(),array('id'=>'DESC'),1,0);
        return $this->render('base/index.html.twig', [
            'controller_name' => 'BaseController',
            'chapitre' => $chapitre[0],
            'article' => $article[0],
        ]);
    }
}
